import type { Timestamp, WithId } from './firebase.js';

export const userRoles = ['admin', 'user'] as const;
export type UserRole = (typeof userRoles)[number];

export type UserDocumentData = {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  email: string;
  role: UserRole;
};

export type User = WithId<UserDocumentData>;

export type Claims = {
  role: UserRole;
};
