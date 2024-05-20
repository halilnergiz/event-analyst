import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';

import { ILoginForm } from '../../types';



const loginSchema = yup.object({
    username: yup
        .string()
        .matches(/^[a-zA-Z0-9]+$/, 'Sadece harf ve sayı')
        .min(4, 'En az 4 karakter')
        .max(50, 'En fazla 50 karakter')
        .trim()
        .required('Zorunlu alan'),
    password: yup
        .string()
        .min(8, 'En az 8 karakter')
        .max(25, 'En fazla 25 karakter')
        .required('Zorunlu alan')
});

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
        await axios.post('login/', {
            'username': inputs.username,
            'password': inputs.password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            localStorage.setItem('access_token', `${res.data.token}`);
            navigate('/dashboard');
            console.log(res);
        }).catch((err) => {
            console.log(err.response.data.non_field_errors);
            alert('Hatalı email veya şifre');
        });
    };

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
                                    error={Boolean(errors.username)}
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
