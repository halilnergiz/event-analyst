import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@mui/joy';
import { TextField } from '@mui/material';

import { axiosResetPasswordInterceptor } from '../../config/axios_config';
import { passwordResetSchema } from '../../schemas';
import { IPasswordReset } from '../../types';

export const PasswordReset = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordReset>({
    defaultValues: {
      new_password: '',
      new_password_repeat: '',
    },
    resolver: yupResolver(passwordResetSchema),
  });

  const onPasswordReset = async (data: IPasswordReset) => {
    console.log(data);
    if (data.new_password !== data.new_password_repeat) {
      return alert('Şifreler aynı değil!');
    }
    try {
      await axiosResetPasswordInterceptor.post(`password_reset/confirm/`, {
        password: data.new_password,
        token: `${searchParams.get('token')}`,
      });
      navigate('/');
      alert('Şifre başarıyla yenilendi\nLütfen giriş yapınız');
    } catch (err) {
      return alert('İşlem başarısız\nLütfen tekrar deneyiniz');
    }
  };

  return (
    <div className='reset-password-container'>
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
        className='reset-password-form'
        onSubmit={handleSubmit(onPasswordReset)}
        autoComplete='off'
      >
        <div className='title'>
          <h3>Şifre Yenileme</h3>
        </div>
        <div className='form-field new-password'>
          <TextField
            variant='outlined'
            label='Yeni Şifre'
            type='password'
            size='small'
            {...register('new_password')}
          />
          {errors.new_password?.message && <p className='alert'> {errors.new_password?.message}</p>}
        </div>
        <div className='form-field new-password-repeat'>
          <TextField
            variant='outlined'
            label='Yeni Şifre (Tekrar)'
            type='password'
            size='small'
            {...register('new_password_repeat')}
          />
          {errors.new_password_repeat?.message && (
            <p className='alert'> {errors.new_password_repeat?.message}</p>
          )}
          <Button
            type='submit'
            color='success'
          >
            Onayla
          </Button>
        </div>
      </form>
    </div>
  );
};
