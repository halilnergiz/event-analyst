import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';

import { Button, FormControl, FormLabel, Input, Stack } from '@mui/joy';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useEventContext } from '../../../context';
import { IUpdateEvent } from '../../../types';
import { createEventSchema } from '../../../schemas';


export const EventUpdate = () => {
    const { eventInformations, setEventInformations } = useEventContext();
    const { eventId } = useParams();
    const navigate = useNavigate();

    const { register, control, handleSubmit, formState: { errors } } = useForm<IUpdateEvent>({
        defaultValues: {
            title: eventInformations?.title,
            description: eventInformations?.description,
            address: eventInformations?.address,
            longitude: eventInformations?.longitude,
            latitude: eventInformations?.latitude,
            start_date: dayjs(eventInformations?.start_date),
            end_date: dayjs(eventInformations?.end_date),
        },
        resolver: yupResolver(createEventSchema),
    });

    const onUpdateEvent: SubmitHandler<IUpdateEvent> = async (data: IUpdateEvent) => {
        try {
            const res = await axios.put(`update_event/${eventId}/`, {
                title: data.title,
                description: data.description,
                address: data.address,
                longitude: data.longitude,
                latitude: data.latitude,
                start_date: data.start_date,
                end_date: data.end_date,
            });
            alert('Etkinlik Güncellendi');
            setEventInformations(res.data);
            console.log(res.data);
            console.log(data);
            navigate(`/dashboard/event/${eventId}/`);
        } catch (err) {
            alert('Başarısız Bağlantı İsteği');
            console.log(data);
            console.log(err);
        }
    };

    useEffect(() => {
        if (!eventInformations) {
            navigate(`/dashboard/event/${eventId}/`);
        }
    }, []);

    return (
        <div className='event-update-container'>
            <h3>Etkinliği Güncelle</h3>
            <form onSubmit={handleSubmit(onUpdateEvent)} >
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
                                    label="Başlangıç Tarihi"
                                    name="start_date"
                                    format='DD/MM/YYYY'
                                    defaultValue={null}
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                            </LocalizationProvider>
                        )} />
                    </FormControl>
                    <FormControl>
                        <Controller control={control} name='end_date' render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='tr'>
                                <DatePicker
                                    {...field}
                                    label="Bitiş Tarihi"
                                    name="end_date"
                                    format='DD/MM/YYYY'
                                    defaultValue={null}
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                                {errors.end_date && <p className='alert'>{errors.end_date.message}</p>}
                            </LocalizationProvider>
                        )} />
                    </FormControl>
                    <Button type="submit" color='success'>Etkinliği Güncelle</Button>
                </Stack>
            </form>
        </div>
    );
};