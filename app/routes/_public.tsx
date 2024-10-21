import { Outlet } from '@remix-run/react';
import { PublicLayout as _PublicLayout } from '~/layouts/PublicLayout';
import type { MetaFunction } from '@remix-run/react';
export const meta: MetaFunction = () => {
  return [
    { title: 'Firebaseチュートリアル' },
    { name: 'description', content: 'Firebaseチュートリアル' },
  ];
};
export default function PublicLayout() {
  return (
    <_PublicLayout>
      <Outlet />
    </_PublicLayout>
  );
}
