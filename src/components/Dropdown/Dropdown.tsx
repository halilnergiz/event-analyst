import { useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export const Dropdown = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/');
    };
    const userName = localStorage.getItem('username');

    return (
        <div className="sec-center">
            <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" />
            <label className="for-dropdown" htmlFor="dropdown" >
                <AccountCircleIcon />
                <span> {userName} </span>
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
