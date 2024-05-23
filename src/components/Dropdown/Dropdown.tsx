import { useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';


export const Dropdown = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('username');

    const logout = async () => {
        try {
            const res = await axios.post('logout/');
            if (res) {
                localStorage.clear();
                navigate('/');
                alert('Oturum Sonlandırıldı');
            }
            console.log(res);
        } catch (err) {
            alert('Lütfen tekrar deneyiniz');
        };
    };

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
