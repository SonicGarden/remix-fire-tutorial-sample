import { logger } from 'firebase-functions/v2';
import {
  beforeUserCreated as _beforeUserCreated,
  HttpsError,
} from 'firebase-functions/v2/identity';
import type { BlockingOptions } from 'firebase-functions/v2/identity';

const defaultRegion = 'asia-northeast1';

type BeforeUserCreatedHandler = Parameters<typeof _beforeUserCreated>[1];
const beforeUserCreated = (
  optsOrHandler: BlockingOptions | BeforeUserCreatedHandler,
  _handler?: BeforeUserCreatedHandler,
) => {
  const handler = _handler ?? (optsOrHandler as BeforeUserCreatedHandler);
  return _beforeUserCreated(
    {
      region: defaultRegion,
      ...(_handler ? (optsOrHandler as BlockingOptions) : {}),
    },
    handler,
  );
};

export { defaultRegion, logger, HttpsError, beforeUserCreated };