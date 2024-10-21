import {
  ResponsiveLayout,
  useResponsiveLayoutContext,
} from '~/components/layouts/ResponsiveLayout';
import { withAuth } from '~/contexts/auth';
import { AccountMenu } from './_components/AccountMenu';
import { NavMenu } from './_components/NavMenu';
import { Title } from './_components/Title';
import type { ReactNode } from 'react';

export const PublicLayout = withAuth(
  ({ children }: { children: ReactNode }) => {
    return (
      <ResponsiveLayout
        header={{ title: <Title /> }}
        navbar={{ navMenu: <NavMenu />, accountMenu: <AccountMenu /> }}
      >
        {children}
      </ResponsiveLayout>
    );
  },
);

export const usePublicLayout = useResponsiveLayoutContext;
