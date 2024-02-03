import React, { useEffect } from 'react';
import { Header } from '../../components/index';
import { Main } from '../Main/Main';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const auth = () => {
            if (!localStorage.getItem('userId')) {
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
