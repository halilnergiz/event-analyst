import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import { Button, TextField } from '@mui/material';

import { IRegisterForm } from '../../types';
import { registerSchema } from '../../schemas';


export const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<IRegisterForm>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            password_again: '',
        },
        resolver: yupResolver(registerSchema)
    });

    const onRegisterSubmit = async (inputs: IRegisterForm) => {
        try {
            await axios.post('register/', {
                username: inputs.username,
                email: inputs.email,
                password: inputs.password,
            });
            alert('Kayıt Başarılı, Lütfen Giriş Yapınız');
            navigate('/');
        } catch (err) {
            alert('Başarısız Bağlantı İsteği');
            console.log(err);
        }
    };

    return (
        <div className='register'>
            <div className="sign-in-container">
                <div className="form-container">
                    <form className='register-form' onSubmit={handleSubmit(onRegisterSubmit)} autoComplete='off' >
                        <div className="title">
                            <h2>Kayıt Ol</h2>
                            {/* <img src="./images/event-analyst-logo.png" alt="" /> */}
                        </div>
                        <div className="user-infs">
                            <div className="form-field user-name">
                                <TextField
                                    variant='outlined'
                                    label='Kullanıcı Adı'
                                    size='small'
                                    error={Boolean(errors.username)}
                                    {...register('username')}
                                />
                                {errors.username?.message && <p className='error'> {errors.username?.message}</p>}
                            </div>
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
                            <div className="form-field repeat-password">
                                <TextField
                                    variant='outlined'
                                    label='Şifre (Tekrar)'
                                    type='password'
                                    size='small'
                                    error={Boolean(errors.password_again)}
                                    {...register('password_again')} />
                                {errors.password_again?.message && <p className='error'> {errors.password_again?.message}</p>}
                            </div>
                        </div>
                        <Button variant='contained' type='submit' sx={{ textTransform: 'none' }}>Kayıt Ol</Button>
                        <div className="nav-area">
                            <span onClick={() => navigate('/')}>Giriş Yap</span>
                        </div>
                    </form>
                </div>

                <div className="logo-container">
                    <div className="logo-content">
                        <img className='logo' src="./images/event-analyst-logo.png" alt="" />
                    </div>
                    <div className="logo-text">
                        <h1>Event Analyst</h1>
                    </div>
                </div>
            </div>

        </div>
    );
};
