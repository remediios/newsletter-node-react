import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';
import { SignUp, Error, ConfirmEmail } from './pages/index.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUp />,
    errorElement: <Error />,
  },
  {
    path: '/confirm-email',
    element: <ConfirmEmail />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
