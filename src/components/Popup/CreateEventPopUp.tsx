import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, DialogContent, DialogTitle, FormControl, FormLabel, Input, Modal, ModalDialog, Stack } from '@mui/joy';
import { Add } from '@mui/icons-material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { ICreateEvent } from '../../types';
import { useDashContext } from '../../context/dash-context';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createEventSchema } from '../../schemas';


export const CreateEventPopUp = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { events, setEvents } = useDashContext();

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<ICreateEvent>({
        defaultValues: {
            title: '',
            description: '',
            longitude: '0',
            latitude: '0',
            address: '',
            start_date: null,
            end_date: null,
        },
        resolver: yupResolver(createEventSchema),
    });

    const onCreateEvent: SubmitHandler<ICreateEvent> = async (data: ICreateEvent) => {
        try {
            const res = await axios.post(`create_event/`, {
                title: data.title,
                description: data.description,
                address: data.address,
                longitude: data.longitude,
                latitude: data.latitude,
                start_date: data.start_date,
                end_date: data.end_date,
            });
            alert('Etkinlik Oluşturuldu');
            setOpen(false);
            setEvents([...events, res.data]);
            navigate('/dashboard');
            console.log(res.data);
        } catch (err) {
            alert('Başarısız Bağlantı İsteği');
            console.log(data);
            console.log(err);
        }
    };

    const onCloseModal = () => {
        setOpen(false);
        reset();
    };

    return (
        <div className='create-event-popup'>
            <Button
                className='create-event-button'
                variant='outlined'
                color='primary'
                onClick={() => setOpen(true)}
            >
                <Add className='create-icon' />
                <span>
                    Etkinlik Oluştur
                </span>
            </Button>
            <Modal open={open} onClose={onCloseModal}>
                <ModalDialog>
                    <DialogTitle>Yeni Etkinlik Oluştur</DialogTitle>
                    <DialogContent>Etkinlik bilgilerini ekleyiniz</DialogContent>
                    <form onSubmit={handleSubmit(onCreateEvent)} >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Etkinlik Adı</FormLabel>
                                <Input {...register('title', { required: true })} autoComplete='off' />
                                {errors.title && <p className='alert'>{errors.title.message}</p>}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Açıklama</FormLabel>
                                <Input {...register('description')} autoComplete='off' />
                                {errors.description && <p className='alert'>{errors.description.message}</p>}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Adres</FormLabel>
                                <Input {...register('address')} autoComplete='off' />
                                {errors.address && <p className='alert'>{errors.address.message}</p>}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Enlem</FormLabel>
                                <Input {...register('latitude')} autoComplete='off' />
                                {errors.latitude && <p className='alert'>{errors.latitude.message}</p>}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Boylam</FormLabel>
                                <Input {...register('longitude')} autoComplete='off' />
                                {errors.longitude && <p className='alert'>{errors.longitude.message}</p>}
                            </FormControl>
                            <FormControl>
                                <Controller control={control} name='start_date' render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='tr'>
                                        <DatePicker
                                            {...field}
                                            label='Başlangıç Tarihi'
                                            name='start_date'
                                            format='DD/MM/YYYY'
                                            value={field.value || null}
                                            slotProps={{ textField: { size: 'small' } }}
                                        />
                                        {errors.start_date && <p className='alert'>{errors.start_date.message}</p>}
                                    </LocalizationProvider>
                                )} />
                            </FormControl>
                            <FormControl>
                                <Controller control={control} name='end_date' render={({ field }) => (
                                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='tr'>
                                        <DatePicker
                                            {...field}
                                            label='Bitiş Tarihi'
                                            name='end_date'
                                            format='DD/MM/YYYY'
                                            value={field.value || null}
                                            slotProps={{ textField: { size: 'small' } }}
                                        />
                                        {errors.end_date && <p className='alert'>{errors.end_date.message}</p>}
                                    </LocalizationProvider>
                                )} />
                            </FormControl>
                            <Button type='submit'>Oluştur</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </div >
    );
};
