import {
  HttpsError,
  beforeUserSignedIn as _beforeUserSignedIn,
  logger,
} from '../utils/firebase/functions.js';

export const beforeUserSignedIn = _beforeUserSignedIn(async (event) => {
  const user = event.data;
  if (
    user.customClaims?.role !== 'admin' &&
    event.eventType ===
      'providers/cloud.auth/eventTypes/user.beforeSignIn:google.com'
  ) {
    logger.warn('Unauthorized user tried to sign in with Google account', {
      user,
    });
    throw new HttpsError('unauthenticated', 'Unauthorized user.');
  }
});
