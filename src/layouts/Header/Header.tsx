import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../components/Dropdown/Dropdown';
import { CreateEventPopUp } from '../../components/Popup/CreateEventPopUp';

export const Header = () => {
    const navigate = useNavigate();
    return (
        <div className='header-container'>
            <div className="logo-container">
                <div className="logo-content">
                    <img
                        className='logo'
                        src='/images/event-analyst-logo.png'
                        alt=""
                        onClick={() => navigate('/dashboard')}
                    />
                </div>
                <div className="logo-text">
                    <span>Event Analyst</span>
                </div>
            </div>
            <div className="nav">
                <CreateEventPopUp />
                <Dropdown />
            </div>
        </div>
    );
};