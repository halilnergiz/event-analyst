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