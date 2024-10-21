import { replace } from '@remix-run/react';
import { AdminRoot } from '~/components/pages/admin/AdminRoot';

export async function clientLoader() {
  return replace('/admin/books');
}

export default function AdminRootPage() {
  return <AdminRoot />;
}
