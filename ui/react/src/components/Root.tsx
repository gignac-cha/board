import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Index } from './Index';
import { OAuth2 } from './OAuth2';

const client = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/*" element={<Index />} />
      <Route path="oauth2/complete/:provider" element={<OAuth2 />} />
    </Route>,
  ),
);

export const Root = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
};
