import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import { EventAnalyses, UploadPhotos } from '../../../components';
import { useEventContext } from '../../../context';


export const EventContent = () => {
    const { isPhotoExist, setIsPhotoExist } = useEventContext();
    const { eventId } = useParams();

    useEffect(() => {
        const isPhotoExist = async () => {
            try {
                const res = await axios.get(`events/${eventId}/photos/`);
                (res.data.length) > 0 ? setIsPhotoExist(true) : setIsPhotoExist(false);
            } catch (err) {
                console.log(err);
            }
        };
        isPhotoExist();
    }, []);

    if (!isPhotoExist) {
        return <UploadPhotos />;
    }
    return <EventAnalyses />;
};
