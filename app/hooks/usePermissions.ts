import { useCallback } from 'react';
import { useAuth } from '~/contexts/auth';

export const usePermissions = () => {
  const { role } = useAuth();
  const validatePathPermission = useCallback(
    (path: string) => {
      if (/^\/admin\/?$/.test(path) && role === 'admin') return true;
      if (/^\/admin\/books\/?$/.test(path) && role === 'admin') return true;
      return false;
    },
    [role],
  );

  return { validatePathPermission };
};
