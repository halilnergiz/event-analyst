import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import {
  Dashboard,
  EventAnalyses,
  EventContent,
  Home,
  Login,
  NoMatch,
  Profile,
  Register,
  UploadPhotos,
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
            element: <EventContent />,
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
