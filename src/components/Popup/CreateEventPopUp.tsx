import React, { useState } from 'react';

import { Button, DialogContent, DialogTitle, FormControl, FormLabel, Input, Modal, ModalDialog, Stack } from '@mui/joy';
import { Add } from '@mui/icons-material';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ICreateEvent {
    userId: string,
    eventName: string;
    eventDescription: string,
    persons: []
}

export const CreateEventPopUp = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<ICreateEvent>({
        defaultValues: {
            eventName: '',
            eventDescription: ''
        }
    });

    const onCreateEvent = async (data: ICreateEvent) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/events`, {
                userId: localStorage.getItem('userId'),
                event_name: data.eventName,
                // eventDescription: data.eventDescription,
                persons: []
            });
            alert('Etkinlik Oluşturuldu');
            setOpen(false);
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
                                <Input {...register('eventName', { required: true })} autoComplete='off' />
                                {errors.eventName && <span style={{ color: 'red', fontSize: '12px' }}>Zorunlu Alan</span>}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Açıklama</FormLabel>
                                <Input {...register('eventDescription')} autoComplete='off' />
                            </FormControl>
                            <Button type="submit">Oluştur</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </div>
    );
};
