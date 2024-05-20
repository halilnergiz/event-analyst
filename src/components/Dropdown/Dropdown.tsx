import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { CreateEventPopUp } from '../Popup/CreateEventPopUp';

const Dropdown = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/');
    };
    const username = localStorage.getItem('username');

    return (
        <div className="sec-center">
            <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" />
            <label className="for-dropdown" htmlFor="dropdown" >
                <AccountCircleIcon />
                <span> {username} </span>
            </label>
            <div className="section-dropdown">
                <span
                    className='dropdown-item'
                    onClick={() => navigate('/dashboard')}
                >
                    Anasayfa
                </span>
                <span
                    className='dropdown-item'
                    onClick={() => navigate('/dashboard/profile')}
                >
                    Profil
                </span>
                <span
                    className='dropdown-item'
                    onClick={logout}
                >
                    Çıkış
                </span>
            </div>
        </div>
    );
};

export default Dropdown;