import { createUser, userRef } from '../models/user.js';
import {
  HttpsError,
  beforeUserCreated as _beforeUserCreated,
  logger,
} from '../utils/firebase/functions.js';

export const beforeUserCreated = _beforeUserCreated(async (event) => {
  const user = event.data;
  if (
    event.eventType ===
    'providers/cloud.auth/eventTypes/user.beforeCreate:google.com'
  ) {
    logger.warn('Unregistered user tried to sign up with Google account', {
      user,
    });
    throw new HttpsError('unauthenticated', 'Unregistered user.');
  }
  if (!user.email)
    throw new HttpsError('invalid-argument', 'Email is required.');

  await createUser(userRef(user.uid), {
    email: user.email,
    role: 'user',
  });

  return {
    ...user,
    customClaims: { role: 'user' },
  };
});
