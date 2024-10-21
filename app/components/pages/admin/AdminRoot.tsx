import { useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { LoadingScreen } from '~/components/screens/LoadingScreen';

export const AdminRoot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/admin/books', { replace: true });
  }, [navigate]);

  return <LoadingScreen />;
};
