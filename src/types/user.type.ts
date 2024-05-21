export interface IEvent {
    event_owner: number;
    eventId: string;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    longitude: number;
    latitude: number;
    address: string;
    updatedAt: Date;
    createdAt: Date;
}

export interface IUser {
    username: string;
    email: string;
    password: string;
    isActive: boolean;
}
