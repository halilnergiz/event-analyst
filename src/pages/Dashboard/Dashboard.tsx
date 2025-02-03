import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Header } from '../../layouts';
import { DashContextProvider } from '../../context';

export const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = () => {
      if (!localStorage.getItem('access_token')) {
        alert('Lütfen giriş yapınız');
        navigate('/');
      }
    };
    auth();
  }, [navigate]);

  return (
    <DashContextProvider>
      <div className='dash-container'>
        <div className='dash-content'>
          <Header />
          <Outlet />
        </div>
      </div>
    </DashContextProvider>
  );
};
