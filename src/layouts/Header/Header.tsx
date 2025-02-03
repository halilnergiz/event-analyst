import { useLocation, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { Button } from '@mui/joy';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from '@mui/icons-material';

import { Dropdown } from '../../components';

export const Header = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const location = useLocation();

  const onDeleteEvent = async () => {
    try {
      const deleteConfirmation = window.confirm('Etkinlik silmek istediğinizden emin misiniz?');
      if (deleteConfirmation) {
        await axios.delete(`delete_event/${eventId}/`);
        alert('Etkinlik silindi');
        return navigate('/dashboard');
      }
    } catch (err) {
      alert('Etkinlik silinirken hata oluştu\nLütfen tekrar deneyiniz');
    }
  };

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
        <Button
          className='create-event-button'
          variant='outlined'
          color='primary'
          startDecorator={<Add />}
          onClick={() => navigate('create-event', { state: { from: location.pathname } })}
        >
          <span className='text'>Etkinlik Oluştur</span>
        </Button>
        {eventId && !location.pathname.includes('update') && (
          <>
            <Button
              className='update-event-button'
              variant='outlined'
              color='success'
              onClick={() => navigate(`event/${eventId}/update`)}
            >
              <AutoModeIcon className='update-icon' />
              <span>Etkinliği Güncelle</span>
            </Button>
            <Button
              className='update-event-button'
              variant='outlined'
              color='danger'
              onClick={onDeleteEvent}
            >
              <DeleteIcon className='update-icon' />
              <span>Etkinliği Sil</span>
            </Button>
          </>
        )}
        <Dropdown />
      </div>
    </div>
  );
};
