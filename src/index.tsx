import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

export const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <RouterProvider
    router={router}
    // TODO: fallbackElement={}
  />
);
