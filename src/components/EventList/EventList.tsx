import { EventCard } from '../EventCard/EventCard';
import { useDashContext } from '../../context/dash-context';
import { IEvent } from '../../types';


export const EventList = () => {
    const { events } = useDashContext();

    return (
        <div className='my-events'>
            {
                events?.map((event: IEvent) => {
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