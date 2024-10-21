import {
  useAuth as _useAuth,
  useDocumentData,
} from '@sonicgarden/react-fire-hooks';
import { createContext, useContext, useMemo } from 'react';
import { userRef } from '~/models/user';
import type { Claims, User, UserRole } from '@local/shared';
import type { User as FirebaseUser } from 'firebase/auth';
import type { FC, ReactNode } from 'react';

type AuthContextValue = {
  firebaseUser?: FirebaseUser | null;
  currentUser?: User | null;
  claims?: Claims | null;
  role: UserRole;
  loading: boolean;
  signedIn: boolean | undefined;
};

const DEFAULT_ROLE = 'user';
export const AuthContext = createContext<AuthContextValue>({
  role: DEFAULT_ROLE,
  loading: false,
  signedIn: undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    user: firebaseUser,
    claims,
    loading: loadingAuth,
    signedIn: signedInAuth,
  } = _useAuth();
  const { data: currentUser, loading: loadingData } = useDocumentData(
    userRef(firebaseUser?.uid),
  );
  const role = useMemo(() => {
    if (!claims?.role || !currentUser?.role) return DEFAULT_ROLE;
    if (claims.role !== currentUser.role) return DEFAULT_ROLE;
    return currentUser.role;
  }, [currentUser?.role, claims?.role]);
  const loading = useMemo(
    () => loadingAuth || loadingData || !!(firebaseUser && !currentUser),
    [loadingAuth, loadingData, firebaseUser, currentUser],
  );
  const signedIn = useMemo(() => {
    if (loading) return undefined;
    return signedInAuth;
  }, [loading, signedInAuth]);
  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        currentUser,
        claims: claims as Claims,
        role,
        loading: loading ?? false,
        signedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export type WithAuthProps = {
  children: ReactNode;
};

export const withAuth = (WrappedComponent: FC<WithAuthProps>) => {
  const WithAuth = ({ children }: { children?: ReactNode }) => (
    <AuthProvider>
      <WrappedComponent>{children}</WrappedComponent>
    </AuthProvider>
  );
  return WithAuth;
};

export const useAuth = () => useContext(AuthContext);
