import {
  ColorSchemeScript as _ColorSchemeScript,
  MantineProvider as _MantineProvider,
} from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import type { ReactNode } from 'react';

export const ColorSchemeScript = () => <_ColorSchemeScript />;

export const MantineProvider = ({ children }: { children: ReactNode }) => (
  <_MantineProvider>
    <Notifications />
    <ModalsProvider>{children}</ModalsProvider>
  </_MantineProvider>
);
