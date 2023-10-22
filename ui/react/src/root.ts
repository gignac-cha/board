import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from './components/Root';

export const initializeRoot = () =>
  createRoot(
    document.body.appendChild(
      document.querySelector('#root') ?? document.createElement('div'),
    ),
  ).render(createElement(Root));
