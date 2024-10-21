import {
  getConverter,
  getFirestore,
  serverTimestamp,
} from '../utils/firebase/firestore.js';
import type { UserDocumentData } from '@local/shared';
import type { DocumentReference } from 'firebase-admin/firestore';

export const userConverter = getConverter<UserDocumentData>();

export const usersRef = () =>
  getFirestore().collection('users').withConverter(userConverter);

export const userRef = (id: string) => usersRef().doc(id);

export const createUser = async (
  ref: DocumentReference<UserDocumentData>,
  data: Omit<UserDocumentData, 'createdAt' | 'updatedAt'>,
) =>
  ref.create({
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...data,
  });
