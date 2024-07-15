import { useNavigate } from 'react-router-dom';

import { Add } from '@mui/icons-material';
import { Button } from '@mui/joy';

export const NoEvent = () => {
    const navigate = useNavigate();
    return (
        <div className="no-event">
            <h2>
                Herhangi bir etkinlik oluşturmadınız, <br />
                Yeni bir etkinlik oluşturmak için tıklayınız
            </h2>
            <Button
                className='create-event-button'
                variant='outlined'
                color='primary'
                startDecorator={<Add />}
                onClick={() => navigate('create-event')}
            >
                <span className='text'>
                    Etkinlik Oluştur
                </span>
            </Button>
        </div>
    );
};
