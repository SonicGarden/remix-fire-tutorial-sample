import {
  ResponsiveLayout,
  useResponsiveLayoutContext,
} from '~/components/layouts/ResponsiveLayout';
import { withAuth } from '~/contexts/auth';
import { AccountMenu } from './_components/AccountMenu';
import { AdminNavMenu } from './_components/AdminNavMenu';
import { AdminTitle } from './_components/AdminTitle';
import type { ReactNode } from 'react';

export const AdminLayout = withAuth(
  ({ children }: { children: ReactNode }) => {
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
