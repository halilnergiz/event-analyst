import { Dayjs } from 'dayjs';

export interface IEvent {
  event_owner: number;
  eventId: string;
  title: string;
  description?: string;
  address?: string;
  longitude?: string;
  latitude?: string;
  start_date?: Dayjs | null;
  end_date?: Dayjs | null;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
}

export interface IPhoto {
  photoId: string;
  event: string;
  path: string;
  createdAt: string;
}
