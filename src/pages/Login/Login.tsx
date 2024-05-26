import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import axios, { AxiosError } from 'axios';
import { Button, TextField } from '@mui/material';

import { ILoginForm } from '../../types';
import { loginSchema } from '../../schemas';


export const Login = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(loginSchema)
    });

    const onLoginSubmit = async (inputs: ILoginForm) => {
        try {
            const res = await axios.post('login/', {
                'username': inputs.username,
                'password': inputs.password,
            });
            localStorage.setItem('access_token', `${res.data.token}`);
            localStorage.setItem('username', `${res.data.user.username}`);
            localStorage.setItem('email', `${res.data.user.email}`);
            navigate('/dashboard');
        } catch (err) {
            if ((err as AxiosError).response?.status === 500) {
                return alert(`En fazla 5 cihazda aynı anda giriş yapabilirsiniz. 
                \n Lütfen diğer cihazların en az birinden çıkış yapın ve tekrar deneyin.`);
            }
            return alert('Hatalı email veya şifre');
        }
    };

    useEffect(() => {
        const userCheck = async () => {
            if (localStorage.getItem('access_token')) {
                try {
                    await axios.get('profile/');
                    return navigate('/dashboard');
                } catch (error) {
                    return localStorage.clear();
                }
            }
        };
        userCheck();
    }, []);

    return (
        <div className='login'>
            <div className="sign-in-container">
                <div className="form-container">
                    <form className='login-form' onSubmit={handleSubmit(onLoginSubmit)} autoComplete='off' >
                        <div className="title">
                            <h2>Giriş Yap</h2>
                        </div>
                        <div className="user-infs">
                            <div className="form-field username">
                                <TextField
                                    variant='outlined'
                                    label='Kullanıcı adı'
                                    size='small'
                                    {...register('username')}
                                />
                                {errors.username?.message && <p className='error'> {errors.username?.message}</p>}
                            </div>
                            <div className="form-field password">
                                <TextField
                                    variant='outlined'
                                    label='Şifre'
                                    type='password'
                                    size='small'
                                    {...register('password')} />
                                {errors.password?.message && <p className='error'> {errors.password?.message}</p>}
                            </div>
                        </div>
                        <Button variant='contained' type='submit' sx={{ textTransform: 'none' }}>Giriş Yap</Button>
                        <div className="nav-area">
                            <span onClick={() => navigate('/forgot-password')}>Şifremi Unuttum?</span>
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
