import { replace } from '@remix-run/node';
import { AdminRoot } from '~/components/pages/admin/AdminRoot';

export async function loader() {
  return replace('/admin/books');
}

export default function AdminRootPage() {
  return <AdminRoot />;
}
