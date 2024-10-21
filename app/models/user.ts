import {
  collection,
  doc,
  getConverter,
  getFirestore,
} from '~/utils/firebase/firestore';
import type { User, UserDocumentData } from '@local/shared';
import type { DocumentReference } from 'firebase/firestore';

export const userConverter = getConverter<UserDocumentData>();

export const usersRef = () =>
  collection(getFirestore(), 'users').withConverter(userConverter);

type RefOrNull<Id extends string | null | undefined> = Id extends string
  ? DocumentReference<User>
  : null;
export const userRef = <Id extends string | null | undefined>(id: Id) =>
  (id ? doc(usersRef(), id) : null) as RefOrNull<Id>;
