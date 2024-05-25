import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import axios from 'axios';

import { UploadPhotos } from '../../../components';
import { useEventContext } from '../../../context';


export const EventContent = () => {
    const { eventPhotos, setEventPhotos } = useEventContext();
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

    if (!eventPhotos.length) {
        return <UploadPhotos />;
    }
    return <Outlet />;
};
