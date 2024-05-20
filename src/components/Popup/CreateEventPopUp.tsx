import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import axios from 'axios';

import { Button, DialogContent, DialogTitle, FormControl, FormLabel, Input, Modal, ModalDialog, Stack } from '@mui/joy';
import { Add } from '@mui/icons-material';

import { ICreateEvent, IEvents } from '../../types';
import { useDashContext } from '../../context/dash-context';

interface ICreateEventPopUp {
    events: IEvents[];
    setEvents: React.Dispatch<React.SetStateAction<IEvents[]>>;
}

export const CreateEventPopUp = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { events, setEvents } = useDashContext();

    const { register, handleSubmit, formState: { errors } } = useForm<ICreateEvent>({
        defaultValues: {
            title: '',
            description: '',
            start_date: '2024-05-10T10:00:00',
            end_date: '2024-05-10T12:00:00',
            longitude: 41.015137,
            latitude: 28.979530,
            address: 'Event Address 1',
        }
    });

    const onCreateEvent: SubmitHandler<ICreateEvent> = async (data: ICreateEvent) => {
        try {
            const res = await axios.post(`create_event/`, {
                title: data.title,
                description: data.description,
                start_date: data.start_date,
                end_date: data.end_date,
                longitude: data.longitude,
                latitude: data.latitude,
                address: data.address,
            });
            alert('Etkinlik Oluşturuldu');
            setOpen(false);
            setEvents([...events, res.data]);
        } catch (err) {
            alert('Başarısız Bağlantı İsteği');
            console.log(err);
        }
    };

    return (
        <div className='create-event-popup'>
            <Button
                variant="outlined"
                color="neutral"
                onClick={() => setOpen(true)}
            >
                <Add />
                Etkinlik Oluştur
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>Yeni Etkinlik Oluştur</DialogTitle>
                    <DialogContent>Etkinlik bilgilerini ekleyiniz</DialogContent>
                    <form onSubmit={handleSubmit(onCreateEvent)} >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Etkinlik Adı</FormLabel>
                                <Input {...register('title', { required: true })} autoComplete='off' />
                                {errors.title && <span role='alert' style={{ color: 'red', fontSize: '12px' }}>Zorunlu Alan</span>}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Açıklama</FormLabel>
                                <Input {...register('description')} autoComplete='off' />
                            </FormControl>
                            <Button type="submit">Oluştur</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </div>
    );
};
