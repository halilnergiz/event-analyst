export interface ILoginForm {
    username: string;
    password: string;
};

export interface ICreateEvent {
    title: string;
    description?: string;
    start_date?: string;
    end_date?: string;
    longitude?: number;
    latitude?: number;
    address?: string;
};