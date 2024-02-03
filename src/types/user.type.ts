export interface IEventPerson {
  name: string;
  surname: string;
  gender: 'Female' | 'Male';
  age: number;
  race: string;
}

export interface IEvents {
  userId: string;
  id: string;
  event_name: string;
  persons: IEventPerson[];
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  id: string;
  events: IEvents[];
}
