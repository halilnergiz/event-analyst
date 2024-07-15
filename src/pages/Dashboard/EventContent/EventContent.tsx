import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import axios from 'axios';

import { useEventContext } from '../../../context';


export const EventContent = () => {
    const { setEventPhotos } = useEventContext();
    const { eventId } = useParams();

    useEffect(() => {
        const isPhotoExist = async () => {
            try {
                const res = await axios.get(`events/${eventId}/photos/`);
                setEventPhotos(res.data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        isPhotoExist();
    }, []);

    return <Outlet />;
};
