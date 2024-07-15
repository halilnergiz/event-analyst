import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, FormControl, FormLabel, Input, Stack } from '@mui/joy';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { ICreateEvent } from '../../../types';

import { createEventSchema } from '../../../schemas';
import { useDashContext } from '../../../context';
import { DatePicker } from '@mui/x-date-pickers';
import { Box, Step, StepConnector, StepLabel, Stepper, stepConnectorClasses, styled } from '@mui/material';
import { Map } from '../../../components';

const steps = [
    'Etkinlik İçeriği',
    'Etkinlik Adresi',
];


export const CreateEvent = () => {
    const navigate = useNavigate();
    const { events, setEvents } = useDashContext();
    const [currentStep, setCurrentStep] = useState(1);

    const { register, control, handleSubmit, setValue, formState: { errors, isValid }, trigger } = useForm({
        defaultValues: {
            title: '',
            description: '',
            longitude: '0',
            latitude: '0',
            address: '',
            start_date: undefined,
            end_date: undefined,
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
            console.log(data);

            setEvents([...events, res.data]);
            navigate('/dashboard');
            console.log(res.data);
        } catch (err) {
            alert('Başarısız Bağlantı İsteği');
            console.log(data);
            console.log(err);
        }
    };

    const nextStep = async () => {
        const isStepValid = await trigger(['title', 'description']);
        if (isStepValid) {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const ConnectorStyle = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 10,
            left: 'calc(-50% + 16px)',
            right: 'calc(50% + 16px)',
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage:
                    'linear-gradient(95deg, rgb(173, 201, 230) 0%, rgb(100, 149, 237) 50%, rgb(25, 118, 210) 100%)',
            },
        },
        [`& .${stepConnectorClasses.line}`]: {
            height: 3,
            border: 0,
            backgroundColor:
                theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderRadius: 1,
        },
    }));

    return (
        <div className='create-event'>
            <Box sx={{ width: '100%' }}>
                <Stepper
                    activeStep={currentStep - 1}
                    alternativeLabel
                    connector={<ConnectorStyle />}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <form onSubmit={handleSubmit(onCreateEvent)}>
                {currentStep === 1 && (
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
                                    {errors.start_date && <p className='alert'>{errors.start_date?.message?.toString()}</p>}
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
                                    {errors.end_date && <p className='alert'>{errors.end_date?.message?.toString()}</p>}
                                </LocalizationProvider>
                            )} />
                        </FormControl>
                        <Button
                            type='button'
                            onClick={nextStep}
                            disabled={!isValid}
                        >
                            İleri
                        </Button>
                    </Stack>
                )}
                {currentStep === 2 && (
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>Adres</FormLabel>
                            <Input {...register('address')} autoComplete='off' />
                            {errors.address && <p className='alert'>{errors.address.message}</p>}
                        </FormControl>

                        <Map setValue={setValue} />
                        {errors.latitude && <p className='alert'>{errors.latitude.message}</p>}
                        {errors.longitude && <p className='alert'>{errors.longitude.message}</p>}
                        <Button type='button' onClick={prevStep}>
                            Geri
                        </Button>
                        <Button type='submit' color='success'>
                            Oluştur
                        </Button>
                    </Stack>
                )}
            </form>
        </div>
    );
};

