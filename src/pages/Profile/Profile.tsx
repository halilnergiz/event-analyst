import React from 'react';
import { Avatar } from '@mui/material';


const stringAvatar = (name: string) => {
    return {
        sx: {
            bgcolor: '#142d40',
        },
        children: `${name.split(' ')[0][0]}`,
    };
};

export const Profile = () => {
    const userName = localStorage.getItem('userName');
    const userMail = localStorage.getItem('userMail');

    return (
        <div className='user-profile-container'>
            <div className="profile-card">
                <div className='avatar'>
                    <Avatar {...stringAvatar(`${userName}`)} />
                </div>
                <div className='user-inf'>
                    <div className='username'>
                        <label className='inf-labels'>Kullanıcı Adı:</label> {userName}
                    </div>
                    <div className='email'>
                        <label className='inf-labels'>Email:</label> {userMail}
                    </div>
                </div>
            </div>
        </div>
    );
};