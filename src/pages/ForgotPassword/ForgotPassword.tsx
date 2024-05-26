import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@mui/joy';
import { TextField } from '@mui/material';

import { forgotPasswordSchema } from '../../schemas';
import { IForgotPassword } from '../../types';


export const ForgotPassword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<IForgotPassword>({
        defaultValues: {
            email: '',
        },
        resolver: yupResolver(forgotPasswordSchema)
    });

    const onForgotPassword = async (data: IForgotPassword) => {
        try {
            await axios.post('password_reset/', {
                email: data.email,
            });
            navigate('/');
            return alert('Şifre yenileme maili gönderildi\nLütfen mailinizi kontrol ediniz');
        } catch (err) {
            if ((err as AxiosError).response?.status === 500) {
                return alert('İşlem başarısız ');
            }
            return alert('Hatalı email');
        }
    };

    return (
        <div className='forgot-password-container'>
            <div className='logo-container'>
                <div className='logo-content'>
                    <img
                        className='logo'
                        src='/images/event-analyst-logo.png'
                        alt='event-analyst-logo'
                        draggable={'false'}
                    />
                </div>
                <div className='logo-text'>
                    <h2>Event Analyst</h2>
                </div>
            </div>
            <form className='form-field email' onSubmit={handleSubmit(onForgotPassword)} autoComplete='off'>
                <div className='title'>
                    <h3>Şifremi Unuttum</h3>
                </div>
                <TextField
                    variant='outlined'
                    label='Email'
                    size='small'
                    {...register('email')}
                />
                {errors.email?.message && <p className='alert'> {errors.email?.message}</p>}
                <Button type='submit'>Mail Gönder</Button>
            </form>
        </div>
    );
};
