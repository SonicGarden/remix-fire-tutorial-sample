import {
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  getAuth,
  signOut as _signOut,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const createUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => _createUserWithEmailAndPassword(getAuth(), email, password);

const signInWithEmailAndPassword = async (
  email: string,
  password: string,
) => _signInWithEmailAndPassword(getAuth(), email, password);

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(getAuth(), provider);
};

const signOut = async () => _signOut(getAuth());

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut,
};
