import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  orderBy,
  query,
  serverTimestamp as _serverTimestamp,
  setDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import type { WithId } from '@local/shared';
import type {
  DocumentData,
  FirestoreDataConverter,
  WithFieldValue,
} from 'firebase/firestore';

const getConverter = <T extends DocumentData>(): FirestoreDataConverter<
  WithId<T>,
  T
> => ({
  toFirestore: (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = data;
    return rest as WithFieldValue<T>;
  },
  fromFirestore: (snapshot, options): WithId<T> => {
    return { id: snapshot.id, ...snapshot.data(options) } as WithId<T>;
  },
});

const serverTimestamp = _serverTimestamp as unknown as () => Timestamp;

export {
  collection,
  deleteDoc,
  doc,
  getConverter,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  Timestamp,
};
