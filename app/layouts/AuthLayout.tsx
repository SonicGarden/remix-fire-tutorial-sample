import { useNavigate, useSearchParams } from '@remix-run/react';
import { useEffect } from 'react';
import {
  ResponsiveLayout,
  useResponsiveLayoutContext,
} from '~/components/layouts/ResponsiveLayout';
import { LoadingScreen } from '~/components/screens/LoadingScreen';
import { useAuth, withAuth } from '~/contexts/auth';
import { Title } from './_components/Title';
import type { ReactNode } from 'react';

export const AuthLayout = withAuth(
  ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect');
    const { signedIn } = useAuth();

    useEffect(() => {
      if (signedIn === true) navigate(redirect || '/', { replace: true });
    }, [signedIn, navigate, redirect]);

    if (signedIn !== false) return <LoadingScreen />;

    return (
      <ResponsiveLayout header={{ title: <Title /> }}>
        {children}
      </ResponsiveLayout>
    );
  },
);

export const useAuthLayout = useResponsiveLayoutContext;
