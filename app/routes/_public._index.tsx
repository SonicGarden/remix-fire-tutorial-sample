import { replace } from '@remix-run/react';
import { LoadingScreen } from '~/components/screens/LoadingScreen';

export async function clientLoader() {
  return replace('/books');
}

export default function Index() {
  return <LoadingScreen />;
}
