import { useNavigate, useParams } from 'react-router-dom';

import AutoModeIcon from '@mui/icons-material/AutoMode';
import { Button } from '@mui/joy';

import { CreateEventPopUp, Dropdown } from '../../components';


export const Header = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();

    console.log(eventId);
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
                {eventId &&
                    <Button
                        className='update-event-button'
                        variant="outlined"
                        color="neutral"
                        onClick={() => navigate(`event/${eventId}/update`)}
                    >
                        <AutoModeIcon className='update-icon' />
                        <span>Etkinlik Güncelle</span>
                    </Button>
                }
                <CreateEventPopUp />
                <Dropdown />
            </div>
        </div >
    );
};