import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import {
  Register,
  Login,
  Home,
  Profile,
  EventAnalyses,
  UploadPhotos,
  NoMatch,
} from '../pages';
import { Dashboard } from '../layouts';

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
            path: 'event-analyses',
            element: <EventAnalyses />,
          },
          {
            path: 'upload-photos',
            element: <UploadPhotos />,
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
