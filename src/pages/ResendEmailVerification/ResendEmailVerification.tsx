import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@mui/joy';
import { TextField } from '@mui/material';

import { forgotPasswordSchema } from '../../schemas';
import { IForgotPassword } from '../../types';

export const ResendEmailVerification = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPassword>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onResendEmailVerification = async (data: IForgotPassword) => {
    try {
      await axios.post('resend_email_verify/', {
        email: data.email,
      });
      navigate('/');
      return alert('Mail doğrulama gönderildi\nLütfen mailinizi kontrol ediniz');
    } catch (err) {
      if ((err as AxiosError).response?.status === 404) {
        return alert('Kullanıcı Bulunamadı!');
      }
      if ((err as AxiosError).response?.status === 403) {
        return alert('Kullanıcı zaten aktif');
      }
      return alert('İşlem başarısız');
    }
  };

  return (
    <div className='resend-email-container'>
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
      <form
        className='form-field email'
        onSubmit={handleSubmit(onResendEmailVerification)}
        autoComplete='off'
      >
        <div className='title'>
          <h3>Email Doğrulama</h3>
        </div>
        <TextField
          variant='outlined'
          label='Email'
          size='small'
          {...register('email')}
        />
        {errors.email?.message && <p className='alert'> {errors.email?.message}</p>}
        <Button type='submit'>Doğrulama Maili Gönder</Button>
      </form>
    </div>
  );
};
