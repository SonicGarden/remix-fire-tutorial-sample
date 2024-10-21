import { Outlet } from '@remix-run/react';
import { AuthLayout as _AuthLayout } from '~/layouts/AuthLayout';
import type { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Firebaseチュートリアル' },
    { name: 'description', content: 'Firebaseチュートリアル' },
  ];
};

export default function AuthLayout() {
  return (
    <_AuthLayout>
      <Outlet />
    </_AuthLayout>
  );
}
