import React, { useEffect, useState } from 'react';
import { Events } from '../Events/Events';
import { CreateEventPopUp } from '../../components';
import axios from 'axios';
import { IEvents } from '../../types/user.type';

export const Home = () => {
    const [eventState, setEventState] = useState<Boolean>(false);
    const [events, setEvents] = useState<IEvents[]>([]);
    const userId = localStorage.getItem('userId');

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
    }, [eventState, userId]);

    return (
        <>
            {
                eventState ? (
                    // TODO: create useContext structure. The component will have a url (into <Route/>)
                    // The error that refresh & being-shown will be fixed thanks to this
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
