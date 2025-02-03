import { useEffect } from 'react';

import axios from 'axios';

import { EventList, NoEvent } from '../../../components';
import { useDashContext } from '../../../context/dash-context';

export const Home = () => {
  const { events, setEvents } = useDashContext();

  useEffect(() => {
    const getUserEvents = async () => {
      try {
        const res = await axios.get(`get_all_events/`);
        setEvents(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserEvents();
  }, []);

  if (!events.length) {
    return <NoEvent />;
  }
  return <EventList />;
};
