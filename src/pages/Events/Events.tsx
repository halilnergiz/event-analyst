import React, { useEffect } from 'react';
import { IEvents } from '../../types/user.type';
import { EventCard } from '../../components';

interface Props {
    events: IEvents[];
}

export const Events = ({ events }: Props) => {
    return (
        <div className='my-events'>
            {
                events?.map((event: IEvents) => {
                    return <EventCard
                        key={event.id}
                        eventId={event.id}
                        title={event.event_name}
                        createdAt={'12.01.2024'}
                    />;
                })
            }
        </div>
    );
};