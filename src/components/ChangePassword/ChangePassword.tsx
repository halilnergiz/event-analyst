import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import axios, { AxiosError } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, DialogContent, DialogTitle, FormControl, FormLabel, Input, Modal, Stack } from '@mui/joy';
import { ModalDialog } from '@mui/joy';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SyncLockIcon from '@mui/icons-material/SyncLock';
import { IconButton } from '@mui/material';

import { IChangePassword } from '../../types';
import { changePassword } from '../../schemas/form-schemas';


export const ChangePassword = () => {
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleMouseUpShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IChangePassword>({
        defaultValues: {
            old_password: '',
            new_password: '',
            new_password_repeat: '',
        },
        resolver: yupResolver(changePassword),
    });

    const onChangePassword: SubmitHandler<IChangePassword> = async (data: IChangePassword) => {
        if (data.new_password !== data.new_password_repeat) {
            return alert('Şifreler aynı değil!');
        }
        try {
            await axios.post(`change_password/`, {
                old_password: data.old_password,
                new_password: data.new_password,
            });

            alert('Şifre başarıyla değiştirildi');
            setOpen(false);
        } catch (err) {
            const error = (err as AxiosError).response?.data!;
            const errorMessage = Object.values(error).join(' ');
            errorMessage.includes('common') ? alert('Lütfen başka bir yeni şifre deneyin, mevcut şifre ile çok benzer') : alert('Mevcut şifre yanlış girildi');
        }
    };

    const onCloseModal = () => {
        setOpen(false);
        reset();
    };

    return (
        <div className='change-password'>
            <Button
                className='change-password-button'
                variant="soft"
                color="warning"
                onClick={() => setOpen(true)}
            >
                <SyncLockIcon className='password-icon' />
                Şifre Değiştir
            </Button>

            <Modal
                open={open}
                onClose={onCloseModal}>
                <ModalDialog>
                    <DialogTitle>Şifre Değiştir</DialogTitle>
                    <DialogContent>Şifreyi değiştirdikten sonra tekrar giriş yapmanız gerekecek</DialogContent>
                    <form onSubmit={handleSubmit(onChangePassword)} >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>Mevcut Şifre</FormLabel>
                                <Input type={showPassword ? 'text' : 'password'} {...register('old_password', { required: true })} autoComplete='off' />
                                {errors.old_password && <p className='alert'>{errors.old_password.message}</p>}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Yeni Şifre</FormLabel>
                                <Input type={showPassword ? 'text' : 'password'} {...register('new_password', { required: true })} autoComplete='off' />
                                {errors.new_password && <p className='alert'>{errors.new_password.message}</p>}
                            </FormControl>
                            <FormControl>
                                <FormLabel>Yeni Şifre Tekrar</FormLabel>
                                <Input type={showPassword ? 'text' : 'password'} {...register('new_password_repeat', { required: true })} autoComplete='off' />
                                {errors.new_password_repeat && <p className='alert'>{errors.new_password_repeat.message}</p>}
                            </FormControl>
                            <IconButton
                                onMouseUp={handleMouseUpShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            <Button type="submit" color='success'>Şifre Değiştir</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </div>

    );
};
