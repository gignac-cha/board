import { lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { SignContextProvider } from '../contexts/SignContext';

const LazyHeader = lazy(() =>
  import('./Header/Header').then(({ Header }) => ({ default: Header })),
);
const LazyMain = lazy(() =>
  import('./Main').then(({ Main }) => ({ default: Main })),
);

export const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.pathname !== '/' &&
      window.location.pathname.endsWith('/')
    ) {
      navigate(window.location.pathname.slice(0, -1), { replace: true });
    }
  }, [navigate]);

  return (
    <SignContextProvider>
      <LazyHeader />
      <Routes>
        <Route path=":boardUniqueId?/*" element={<LazyMain />} />
      </Routes>
    </SignContextProvider>
  );
};
