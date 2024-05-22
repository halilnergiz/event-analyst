import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import { EventAnalyses } from '../EventAnalyses/EventAnalyses';
import { UploadPhotos } from '../UploadPhotos/UploadPhotos';

export const EventContent = () => {
    const { eventId } = useParams();
    const [photo, setPhoto] = useState<Boolean>(false);

    useEffect(() => {
        const isPhotoExist = async () => {
            try {
                const res = await axios.get(`events/${eventId}/photos/`);
                (res.data.length) > 0 ? setPhoto(true) : setPhoto(false);
            } catch (err) {
                console.log(err);
            }
        };
        isPhotoExist();
    }, []);

    return (
        <>
            {
                !photo ? (
                    <UploadPhotos />
                ) : (
                    <EventAnalyses />
                )
            }
        </>
    );
};
