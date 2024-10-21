import { useAuth as _useAuth } from '@sonicgarden/react-fire-hooks';
import { createContext, useContext, useMemo } from 'react';
import type { User as FirebaseUser, ParsedToken } from 'firebase/auth';
import type { FC, ReactNode } from 'react';

type AuthContextValue = {
  firebaseUser?: FirebaseUser | null;
  claims?: ParsedToken | null;
  loading: boolean;
  signedIn: boolean | undefined;
};

export const AuthContext = createContext<AuthContextValue>({
  loading: false,
  signedIn: undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    user: firebaseUser,
    claims,
    loading,
    signedIn: signedInAuth,
  } = _useAuth();
  const signedIn = useMemo(() => {
    if (loading) return undefined;
    return signedInAuth;
  }, [loading, signedInAuth]);
  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        claims,
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
