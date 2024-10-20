import '@mantine/core/styles.css';
import './tailwind.css';
import { Center, Title } from '@mantine/core';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';
import { LoadingScreen } from '~/components/screens/LoadingScreen';
import {
  ColorSchemeScript,
  MantineProvider,
} from '~/utils/mantine/provider';
import type { LinksFunction } from '@remix-run/node';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          {children}
          <ScrollRestoration />
          <Scripts />
        </MantineProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return <LoadingScreen />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const errorMessage =
    (isRouteErrorResponse(error) && error.statusText) ??
    'An Error Occurred';

  return (
    <Center h={100}>
      <Title order={1} size='h5'>
        {errorMessage}
      </Title>
    </Center>
  );
}
