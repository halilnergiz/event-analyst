import { EventCard } from '../EventCard/EventCard';
import { useDashContext } from '../../context/dash-context';
import { IEvent } from '../../types';
import { customDateFormatSystem } from '../../schemas';

export const EventList = () => {
  const { events } = useDashContext();

  return (
    <div className='my-events'>
      {events?.map((event: IEvent) => {
        console.log(event);
        const convertedDate = new Date(event.createdAt!);
        return (
          <EventCard
            key={event.eventId}
            eventId={event.eventId}
            title={event.title}
            description={event.description}
            createdAt={customDateFormatSystem(convertedDate)}
          />
        );
      })}
    </div>
  );
};
