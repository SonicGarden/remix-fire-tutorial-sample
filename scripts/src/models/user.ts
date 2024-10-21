import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import {
  getConverter,
  getDocumentData,
  serverTimestamp,
} from '../utils/firebase';
import type { UserDocumentData } from '@local/shared';
import type { DocumentReference } from 'firebase-admin/firestore';

const userConverter = getConverter<UserDocumentData>();

const usersRef = () =>
  getFirestore().collection('users').withConverter(userConverter);

const userRef = (uid: string) => usersRef().doc(uid);

const getAuthUserByUid = async (uid: string) => {
  const auth = getAuth();
  return await auth.getUser(uid);
};

const getAuthUserByEmail = async (email: string) => {
  const auth = getAuth();
  return await auth.getUserByEmail(email);
};

const getAuthUser = async ({
  uid,
  email,
}: {
  uid?: string;
  email?: string;
}) => {
  if (uid) return await getAuthUserByUid(uid);
  if (email) return await getAuthUserByEmail(email);
  throw new Error('uid or email is required');
};

const getUser = async ({ uid }: { uid: string }) => {
  const { data } = await getDocumentData(userRef(uid));
  return data;
};

export const createFirestoreUser = async (
  ref: DocumentReference<UserDocumentData>,
  data: Omit<UserDocumentData, 'createdAt' | 'updatedAt'>,
) =>
  ref.create({
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...data,
  });

const createAdminUser = async (email: string) => {
  const auth = getAuth();
  const user = await auth.createUser({ email, emailVerified: true });
  await auth.setCustomUserClaims(user.uid, { role: 'admin' });
  await createFirestoreUser(userRef(user.uid), { email, role: 'admin' });
  return { uid: user.uid };
};

export {
  userConverter,
  usersRef,
  userRef,
  getAuthUser,
  getUser,
  createAdminUser,
};
