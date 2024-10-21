import { Box, NavLink } from '@mantine/core';
import { Link } from '@remix-run/react';

export const NavMenu = () => {
  return (
    <Box aria-label='ナビゲーションメニュー'>
      <NavLink
        label='書籍'
        component={Link}
        to='/books'
        prefetch='viewport'
      />
    </Box>
  );
};
