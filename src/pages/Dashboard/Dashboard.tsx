import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header, Main } from '../../layouts';

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
        <div className='dash-container'>
            <div className='dash-content'>
                <Header />
                <Main />
            </div>
        </div>
    );
};
