import { useCollectionData as _useCollectionData } from '@sonicgarden/react-fire-hooks';

export const useCollectionData = <T>(
  ...[query, options]: Parameters<typeof _useCollectionData<T>>
) =>
  _useCollectionData(query, {
    ...options,
    snapshotOptions: {
      serverTimestamps: 'estimate',
      ...options?.snapshotOptions,
    },
  });
