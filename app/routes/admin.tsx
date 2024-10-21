import { Outlet } from '@remix-run/react';
import { AdminLayout as _AdminLayout } from '~/layouts/AdminLayout';
import type { MetaFunction } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Firebaseチュートリアル (admin)' },
    { name: 'description', content: 'Firebaseチュートリアル (admin)' },
  ];
};

export default function AdminLayout() {
  return (
    <_AdminLayout>
      <Outlet />
    </_AdminLayout>
  );
}
