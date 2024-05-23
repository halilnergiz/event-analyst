import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import { EventAnalyses, UploadPhotos } from '../../../components';
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
    return <EventAnalyses />;
};
