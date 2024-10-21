import {
  useLocation,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import { useEffect, useMemo } from 'react';
import {
  ResponsiveLayout,
  useResponsiveLayoutContext,
} from '~/components/layouts/ResponsiveLayout';
import { LoadingScreen } from '~/components/screens/LoadingScreen';
import { useAuth, withAuth } from '~/contexts/auth';
import { AdminTitle } from './_components/AdminTitle';
import { Title } from './_components/Title';
import type { ReactNode } from 'react';

export const AuthLayout = withAuth(
  ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect');
    const { signedIn } = useAuth();
    const isAdminPage = useMemo(
      () => location.pathname.startsWith('/admin'),
      [location.pathname],
    );
    const header = useMemo(
      () =>
        isAdminPage
          ? {
              title: <AdminTitle />,
              props: { bg: 'black', c: 'white' },
            }
          : { title: <Title /> },
      [isAdminPage],
    );

    useEffect(() => {
      if (signedIn === true) navigate(redirect || '/', { replace: true });
    }, [signedIn, navigate, redirect]);

    if (signedIn !== false) return <LoadingScreen />;

    return <ResponsiveLayout header={header}>{children}</ResponsiveLayout>;
  },
);

export const useAuthLayout = useResponsiveLayoutContext;
