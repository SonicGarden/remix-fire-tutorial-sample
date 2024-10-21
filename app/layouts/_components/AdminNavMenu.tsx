import { Box, NavLink } from '@mantine/core';
import { Link } from '@remix-run/react';

export const AdminNavMenu = () => {
  return (
    <Box aria-label='ナビゲーションメニュー'>
      <NavLink
        label='書籍管理'
        component={Link}
        to='/admin/books'
        prefetch='viewport'
      />
    </Box>
  );
};
