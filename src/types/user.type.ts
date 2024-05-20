export interface IEventPerson {
    name: string;
    surname: string;
    gender: 'Female' | 'Male';
    age: number;
    race: string;
}

export interface IEvents {
    event_owner: string;
    eventId: string;
    title: string;
    createdAt: string;
    persons: IEventPerson[];
}

export interface IUser {
    username: string;
    email: string;
    password: string;
    isActive: boolean;
}
