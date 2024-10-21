import { useDocumentData as _useDocumentData } from '@sonicgarden/react-fire-hooks';

export const useDocumentData = <T>(
  ...[ref, options]: Parameters<typeof _useDocumentData<T>>
) =>
  _useDocumentData(ref, {
    ...options,
    snapshotOptions: {
      serverTimestamps: 'estimate',
      ...options?.snapshotOptions,
    },
  });
