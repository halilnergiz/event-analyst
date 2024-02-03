import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { Button, TextField } from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { IUser } from '../../types/user.type';

const loginSchema = yup.object({
    email: yup
        .string()
        .matches(/^[a-zA-Z0-9ğüşöçİĞÜŞÖÇ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/, 'Email formatına uygun değil')
        .min(3, 'En az 3 karakter')
        .max(50, 'En fazla 50 karakter')
        .trim()
        .required('Zorunlu alan'),
    password: yup
        .string()
        .min(8, 'En az 8 karakter')
        .max(25, 'En fazla 25 karakter')
        .required('Zorunlu alan')
});

interface ILoginForm {
    email: string,
    password: string,
}

export const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(loginSchema)
    });

    const onLoginSubmit = async (inputs: ILoginForm) => {
        try {
            // TODO: user check implementation will be delete - it will be at Backend
            const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/users`);
            const { data } = res;
            const checkUserDB = data.find((user: IUser) => {
                if (user.email === inputs.email && user.password === inputs.password) {
                    localStorage.setItem('userId', `${user.id}`);
                    localStorage.setItem('userName', `${user.username}`);
                    localStorage.setItem('userMail', `${user.email}`);
                    return user.email;
                }
            });

            // Login process after the verifications
            if (!!checkUserDB) {
                navigate('/dashboard');
            } else {
                alert('Hatalı email veya şifre');
            }
        } catch (err) {
            console.log(err);
            alert('Başarısız Bağlantı İsteği');
        }
    };

    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <div className='login'>
            <div className="sign-in-container">
                <div className="form-container">
                    <form className='login-form' onSubmit={handleSubmit(onLoginSubmit)} autoComplete='off' >
                        <div className="title">
                            <h2>Giriş Yap</h2>
                            {/* <img src="./images/event-analyst-logo.png" alt="" /> */}
                        </div>
                        <div className="user-infs">
                            <div className="form-field email">
                                <TextField
                                    variant='outlined'
                                    label='Email'
                                    size='small'
                                    error={Boolean(errors.email)}
                                    {...register('email')}
                                />
                                {errors.email?.message && <p className='error'> {errors.email?.message}</p>}
                            </div>
                            <div className="form-field password">
                                <TextField
                                    variant='outlined'
                                    label='Şifre'
                                    type='password'
                                    size='small'
                                    error={Boolean(errors.password)}
                                    {...register('password')} />
                                {errors.password?.message && <p className='error'> {errors.password?.message}</p>}
                            </div>
                        </div>
                        <Button variant='contained' type='submit' sx={{ textTransform: 'none' }}>Giriş Yap</Button>
                        <div className="nav-area">
                            <span onClick={() => navigate('')}>Şifremi Unuttum?</span>
                            <span onClick={() => navigate('/register')}>Kayıt Ol</span>
                        </div>
                    </form>
                </div>

                <div className="img-container">
                    <div className="img-content">
                        <img src="./images/data-report.png" alt="" />
                    </div>
                </div>
            </div>

        </div>
    );
};
