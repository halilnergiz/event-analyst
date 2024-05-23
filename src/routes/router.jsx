import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import {
  Dashboard,
  EventContent,
  Home,
  Login,
  NoMatch,
  Profile,
  Register,
} from '../pages';
import { EventContextProvider } from '../context';

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
            path: 'event/:eventId',
            element: (
              <EventContextProvider>
                <EventContent />
              </EventContextProvider>
            ),
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
