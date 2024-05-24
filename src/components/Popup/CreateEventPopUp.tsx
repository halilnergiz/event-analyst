import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import axios from 'axios';

import { Button, DialogContent, DialogTitle, FormControl, FormLabel, Input, Modal, ModalDialog, Stack } from '@mui/joy';
import { Add } from '@mui/icons-material';

import { ICreateEvent } from '../../types';
import { useDashContext } from '../../context/dash-context';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';


export const CreateEventPopUp = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { events, setEvents } = useDashContext();

    const { register, handleSubmit, formState: { errors } } = useForm<ICreateEvent>({
        defaultValues: {
            title: undefined,
            description: undefined,
            start_date: new Date('2024-05-10T10:00:00'), // start_date: new Date(''),
            end_date: new Date('2024-05-10T12:00:00'), // end_date: new Date(''),
            longitude: undefined,
            latitude: undefined,
            address: undefined,
        }
    });
    
    const onCreateEvent: SubmitHandler<ICreateEvent> = async (data: ICreateEvent) => {
        try {
            const res = await axios.post(`create_event/`, {
                title: data.title,
                description: data.description,
                start_date: data.start_date, // start_date: new Date(`${data.start_date}`),
                end_date: data.end_date, // end_date: new Date(`${data.end_date}`),
                longitude: data.longitude as number,
                latitude: data.latitude as number,
                address: data.address,
            });
            alert('Etkinlik Oluşturuldu');
            setOpen(false);
            setEvents([...events, res.data]);
            navigate('/dashboard');
            console.log(res.data);
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
                            <FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Başlangıç Tarihi" name="startDate" slotProps={{ textField: { size: 'small' } }} />
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker label="Bitiş Tarihi" name="startDate" slotProps={{ textField: { size: 'small' } }} />
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Enlem</FormLabel>
                                <Input {...register('latitude')} autoComplete='off' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Boylam</FormLabel>
                                <Input {...register('longitude')} autoComplete='off' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Adres</FormLabel>
                                <Input {...register('address')} autoComplete='off' />
                            </FormControl>
                            <Button type="submit">Oluştur</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </div>
    );
};
