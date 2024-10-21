import { replace } from '@remix-run/node';
import { LoadingScreen } from '~/components/screens/LoadingScreen';

export async function loader() {
  return replace('/books');
}

export default function Index() {
  return <LoadingScreen />;
}
