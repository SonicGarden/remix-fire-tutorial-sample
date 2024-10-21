import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { initializeApp as _initializeApp, cert } from 'firebase-admin/app';
import { FieldValue } from 'firebase-admin/firestore';
import type { WithId } from '@local/shared';
import type {
  Timestamp,
  DocumentData,
  FirestoreDataConverter,
  WithFieldValue,
  DocumentReference,
} from 'firebase-admin/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SERVICE_ACCOUNT = process.env.SCRIPTS_GOOGLE_SERVICE_ACCOUNT;

const serviceAccountKeyDir = resolve(
  __dirname,
  '../../google_application_credentials',
);
const serviceAccountKeyPath = () =>
  resolve(serviceAccountKeyDir, `${SERVICE_ACCOUNT}.json`);

const getServiceAccountKeyData = async () => {
  const filePath = serviceAccountKeyPath();
  if (!(await exists(filePath))) return;
  const { default: serviceAccountKeyData } = await import(filePath, {
    assert: { type: 'json' },
  });
  return serviceAccountKeyData;
};

const createServiceAccountKey = () => {
  const filePath = serviceAccountKeyPath();
  execSync(
    `gcloud iam service-accounts keys create ${filePath} --iam-account=${SERVICE_ACCOUNT}`,
  );
};

const exists = async (path: string) => {
  try {
    await fs.access(path);
    return true;
  } catch (e) {
    return false;
  }
};

const deleteServiceAccountKey = async () => {
  const serviceAccountKeyData = await getServiceAccountKeyData();
  if (!serviceAccountKeyData) return;
  execSync(
    `yes | gcloud iam service-accounts keys delete ${serviceAccountKeyData['private_key_id']} --iam-account=${SERVICE_ACCOUNT}`,
  );
  execSync(`rm -f ${serviceAccountKeyPath()}`);
};

const initializeApp = async () => {
  createServiceAccountKey();
  const serviceAccountKeyData = await getServiceAccountKeyData();
  return _initializeApp({ credential: cert(serviceAccountKeyData) });
};

const runWithFirebaseApp = async <T>(fn: () => Promise<T>) => {
  try {
    await initializeApp();
    return await fn();
  } catch (error) {
    console.error(error);
  } finally {
    deleteServiceAccountKey();
  }
};

const { serverTimestamp: _severTimestamp } = FieldValue;

const serverTimestamp = () => _severTimestamp() as Timestamp;

const getConverter = <T extends DocumentData>(): FirestoreDataConverter<
  WithId<T>,
  T
> => ({
  toFirestore: (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = data;
    return rest as WithFieldValue<T>;
  },
  fromFirestore: (snapshot) => {
    return { id: snapshot.id, ...snapshot.data() } as WithId<T>;
  },
});

const getDocumentData = async <T>(ref: DocumentReference<T>) =>
  ref.get().then((doc) => ({
    data: { id: doc.id, ...doc.data() } as WithId<T>,
    exists: doc.exists,
  }));

export {
  runWithFirebaseApp,
  serverTimestamp,
  getConverter,
  getDocumentData,
};
