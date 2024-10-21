import { initializeApp as _initializeApp, getApps } from 'firebase/app';
import type { FirebaseOptions } from 'firebase/app';

export const initializeApp = (config: FirebaseOptions) => {
  if (getApps().length !== 0) return;

  _initializeApp(config);
};
