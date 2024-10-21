import { Avatar, Box, Group, NavLink, Text } from '@mantine/core';
import { useLocation, Link } from '@remix-run/react';
import { useCallback } from 'react';
import { UnstyledConfirmButton } from '~/components/elements/UnstyledConfirmButton';
import { useAuth } from '~/contexts/auth';
import { signOut } from '~/utils/firebase/auth';
import { notify } from '~/utils/mantine/notifications';

export const AccountMenu = () => {
  const location = useLocation();
  const currentPath = location.pathname + location.search;
  const { firebaseUser } = useAuth();
  const handleConfirmSignOut = useCallback(async () => {
    await signOut();
    notify.info({
      message: 'サインアウトしました',
    });
  }, []);

  return (
    <Box aria-label='アカウントメニュー'>
      {firebaseUser ? (
        <>
          <NavLink
            label={
              <Group wrap='nowrap'>
                <Avatar size='sm' />
                <Text truncate='end'>{firebaseUser.email}</Text>
              </Group>
            }
          >
            <NavLink
              label='サインアウト'
              component={UnstyledConfirmButton}
              message='本当にサインアウトしますか？'
              onConfirm={handleConfirmSignOut}
            />
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            label='サインイン'
            component={Link}
            to={{ pathname: 'sign-in', search: `?redirect=${currentPath}` }}
            replace
          />
          <NavLink
            label='サインアップ'
            component={Link}
            to={{ pathname: 'sign-up', search: `?redirect=${currentPath}` }}
            replace
          />
        </>
      )}
    </Box>
  );
};
