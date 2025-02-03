import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

export const NoMatch = () => {
  const navigate = useNavigate();
  return (
    <div className='no-match-container'>
      <div className='content'>
        <div id='notfound'>
          <div className='notfound'>
            <div className='notfound-404'>
              <h3>Sayfa Bulunamadı</h3>
              <h1 className='numbers'>
                <span>4</span>
                <span>0</span>
                <span>4</span>
              </h1>
            </div>
            <h2 className='little-message'>Üzgünüz, sayfa mevcut değil</h2>
            <Button onClick={() => navigate('/dashboard')}>Ana Sayfaya Dön</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
