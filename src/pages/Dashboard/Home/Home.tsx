import { useEffect, useState } from 'react';

import axios from 'axios';

import { Events } from '../Events/Events';
import { IEvents } from '../../../types';
import { CreateEventPopUp } from '../../../components';

export const Home = () => {
    const [eventState, setEventState] = useState<Boolean>(false);
    const [events, setEvents] = useState<IEvents[]>([]);

    useEffect(() => {
        const getUserEvents = async () => {
            try {
                const res = await axios.get(`get_all_events/`);
                const { data } = res;
                setEvents(data);
                if (data.length !== 0) {
                    setEventState(true);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getUserEvents();
    }, [eventState]);

    return (
        <>
            {
                eventState ? (
                    <Events events={events} />
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
