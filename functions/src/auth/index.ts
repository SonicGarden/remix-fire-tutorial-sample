import { beforeUserCreated } from './beforeUserCreated.js';
import { beforeUserSignedIn } from './beforeUserSignedIn.js';

export const auth = {
  beforeUserCreated,
  beforeUserSignedIn,
};
