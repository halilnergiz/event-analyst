import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { EventContextProvider } from '../context';
import {
  Login,
  Register,
  ForgotPassword,
  PasswordReset,
  Dashboard,
  Home,
  CreateEvent,
  Profile,
  EventContent,
  EventUpdate,
  EventAnalyses,
  NoMatch,
} from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'password-reset',
        element: <PasswordReset />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'create-event',
            element: <CreateEvent />,
          },
          {
            path: 'event/:eventId',
            element: (
              <EventContextProvider>
                <EventContent />
              </EventContextProvider>
            ),
            children: [
              {
                index: true,
                element: <EventAnalyses />,
              },
              {
                path: 'update',
                element: <EventUpdate />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <NoMatch />,
      },
    ],
  },
]);

export default router;
