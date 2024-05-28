import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@mui/joy';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import DeleteIcon from '@mui/icons-material/Delete';

import { CreateEventPopUp, Dropdown } from '../../components';


export const Header = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();

    return (
        <div className='header-container'>
            <div className='logo-container'>
                <div className='logo-content'>
                    <img
                        className='logo'
                        src='/images/event-analyst-logo.png'
                        alt=''
                        onClick={() => navigate('/dashboard')}
                        draggable={'false'}
                    />
                </div>
                <div className='logo-text'>
                    <span>Event Analyst</span>
                </div>
            </div>
            <div className='nav'>
                <CreateEventPopUp />
                {eventId &&
                    <Button
                        className='update-event-button'
                        variant='outlined'
                        color='success'
                        onClick={() => navigate(`event/${eventId}/update`)}
                    >
                        <AutoModeIcon className='update-icon' />
                        <span>Etkinliği Güncelle</span>
                    </Button>
                }
                <Dropdown />
            </div>
        </div >
    );
};