import { useNavigate, useLocation } from '@remix-run/react';
import { useEffect } from 'react';
import {
  ResponsiveLayout,
  useResponsiveLayoutContext,
} from '~/components/layouts/ResponsiveLayout';
import { LoadingScreen } from '~/components/screens/LoadingScreen';
import { withAuth, useAuth } from '~/contexts/auth';
import { usePermissions } from '~/hooks/usePermissions';
import { AccountMenu } from './_components/AccountMenu';
import { AdminNavMenu } from './_components/AdminNavMenu';
import { AdminTitle } from './_components/AdminTitle';
import type { ReactNode } from 'react';

export const AdminLayout = withAuth(
  ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname + location.search;
    const { signedIn } = useAuth();
    const { validatePathPermission } = usePermissions();
    const validatedPathPermission = validatePathPermission(currentPath);

    useEffect(() => {
      if (signedIn === false)
        navigate(
          {
            pathname: '/admin/sign-in',
            search: `?redirect=${currentPath}`,
          },
          { replace: true },
        );
      if (signedIn === true && !validatedPathPermission)
        navigate('/', { replace: true });
    }, [signedIn, validatedPathPermission, currentPath, navigate]);

    if (!signedIn) return <LoadingScreen />;
    if (!validatedPathPermission) return <LoadingScreen />;

    return (
      <ResponsiveLayout
        header={{
          title: <AdminTitle />,
          props: { bg: 'black', c: 'white' },
        }}
        navbar={{ navMenu: <AdminNavMenu />, accountMenu: <AccountMenu /> }}
      >
        {children}
      </ResponsiveLayout>
    );
  },
);

export const useAdminLayout = useResponsiveLayoutContext;
