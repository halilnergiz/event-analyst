import { EventCard } from '../../../components';
import { IEvents } from '../../../types';

interface Props {
    events: IEvents[];
}

export const Events = ({ events }: Props) => {
    return (
        <div className='my-events'>
            {
                events?.map((event: IEvents) => {
                    console.log(event);
                    const convertedDate = new Date(event.createdAt);
                    return <EventCard
                        key={event.eventId}
                        eventId={event.eventId}
                        title={event.title}
                        createdAt={`${convertedDate.getDate()}/${convertedDate.getMonth() + 1}/${convertedDate.getFullYear()} ${convertedDate.getHours()}:${convertedDate.getMinutes()}`}
                    />;
                })
            }
        </div>
    );
};