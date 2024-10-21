import { auth as _auth } from './auth/index.js';
import { initializeApp } from './utils/firebase/app.js';

process.env.TZ = 'Asia/Tokyo';
initializeApp();

export const auth = { ..._auth };
