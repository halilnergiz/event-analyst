import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { EventContextProvider } from '../context';
import {
  Dashboard,
  EventContent,
  EventUpdate,
  EventAnalyses,
  Home,
  Login,
  NoMatch,
  Profile,
  Register,
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
