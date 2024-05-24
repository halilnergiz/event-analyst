import { FileWithPath } from 'react-dropzone';

export interface IRegisterForm {
    username: string;
    email: string,
    password: string,
    password_again: string,
}

export interface ILoginForm {
    username: string;
    password: string;
};

export interface ICreateEvent {
    title: string;
    description?: string;
    start_date?: Date;
    end_date?: Date;
    longitude?: number;
    latitude?: number;
    address?: string;
};

export interface ImgFilePreview {
    file: FileWithPath;
    preview: string;
}

export interface IChangePassword {
    old_password: string,
    new_password: string,
    new_password_repeat: string,
}