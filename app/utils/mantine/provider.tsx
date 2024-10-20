import {
  ColorSchemeScript as _ColorSchemeScript,
  MantineProvider as _MantineProvider,
} from '@mantine/core';
import type { ReactNode } from 'react';

export const ColorSchemeScript = () => <_ColorSchemeScript />;

export const MantineProvider = ({ children }: { children: ReactNode }) => (
  <_MantineProvider>{children}</_MantineProvider>
);
