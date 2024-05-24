import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { Button } from '@mui/joy';
import LogoutIcon from '@mui/icons-material/Logout';


export const LogoutAll = () => {
    const navigate = useNavigate();

    const onLogoutAllDevices = async () => {
        try {
            const res = await axios.post('logoutall/');
            if (res) {
                alert('Giriş yapılan tüm cihazlarda oturum kapatıldı');
                navigate('/');
                localStorage.clear();
            }
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const logoutAllConfirmation = () => {
        const windowConfirmation = window.confirm("Giriş yapılan tüm cihazlarda oturum sonlandırılacak. Emin misin?");
        if (windowConfirmation) {
            onLogoutAllDevices();
        }
    };

    return (
        <Button
            className='logout-all-button'
            variant="soft"
            color="danger"
            onClick={logoutAllConfirmation}
        >
            <LogoutIcon className='logout-icon' />
            Tüm Cihazlardan Çıkış Yap
        </Button>

    );
};
