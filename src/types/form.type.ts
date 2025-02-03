import { Dayjs } from 'dayjs';
import { FileWithPath } from 'react-dropzone';

export interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  password_again: string;
}

export interface ILoginForm {
  username: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IPasswordReset {
  new_password: string;
  new_password_repeat: string;
}

export interface ICreateEvent {
  title: string;
  description?: string;
  address?: string;
  longitude?: string;
  latitude?: string;
  start_date?: Dayjs | null;
  end_date?: Dayjs | null;
}

export interface IUpdateEvent {
  title: string;
  description?: string;
  address?: string;
  longitude?: string;
  latitude?: string;
  start_date?: Dayjs | null;
  end_date?: Dayjs | null;
}

export interface ImgFilePreview {
  file: FileWithPath;
  preview: string;
}

export interface IChangePassword {
  old_password: string;
  new_password: string;
  new_password_repeat: string;
}
