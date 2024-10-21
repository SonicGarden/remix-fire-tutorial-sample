import type { Timestamp, WithId } from './firebase.js';

export type BookDocumentData = {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  title: string;
  description: string;
  image: {
    path: string;
    url: string;
  };
};

export type Book = WithId<BookDocumentData>;
