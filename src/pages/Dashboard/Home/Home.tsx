import { useEffect } from 'react';

import axios from 'axios';

import { useDashContext } from '../../../context/dash-context';
import { CreateEventPopUp, EventList } from '../../../components';

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

    return (
        <>
            {
                (true) ? (
                    <>
                        <EventList events={events} />
                    </>
                ) : (
                    <div className="no-event">
                        <h2>
                            Herhangi bir etkinlik oluşturmadınız, <br />
                            Yeni bir etkinlik oluşturmak için tıklayınız
                        </h2>
                        <CreateEventPopUp />
                    </div>
                )
            }
        </>
    );
};
