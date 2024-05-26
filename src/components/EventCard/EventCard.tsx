import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/joy';


interface IEventCard {
    eventId: string;
    title: string;
    createdAt: string | number;
    description: string | undefined;
}

export const EventCard = ({ eventId, title, createdAt, description }: IEventCard) => {
    const navigate = useNavigate();
    const onRouteDetails = () => {
        navigate(`event/${eventId}/`);
    };

    return (
        <div className='event-card'>
            <div className='headers'>
                <h3 className='title'>
                    {title}
                </h3>
                <div className='description'>
                    {description
                        ? <span>{description}</span>
                        : <span className='non-description'>Etkinliğe açıklama ekleyiniz</span>
                    }
                </div>
            </div>
            <div className='footnote'>
                <div className='details'>
                    <span>
                        Oluşturulma Tarihi
                    </span>
                    <span>
                        {createdAt}
                    </span>
                </div>
                <Button
                    className='route-event-content-button'
                    variant='solid'
                    size='sm'
                    color='primary'
                    fullWidth
                    onClick={onRouteDetails}
                >
                    Etkinlik İçeriği
                </Button>
            </div>
        </div>
    );
};
