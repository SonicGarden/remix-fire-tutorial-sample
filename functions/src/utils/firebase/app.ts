import {
  initializeApp as _initializeApp,
  getApps,
} from 'firebase-admin/app';

const initializeApp = () => {
  if (getApps().length !== 0) return;
  _initializeApp();
};

export { initializeApp };
