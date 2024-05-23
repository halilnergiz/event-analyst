import React, { useContext, useState } from 'react';
import { IPhoto } from '../types';


interface IEventContext {
    eventPhotos: IPhoto[];
    setEventPhotos: React.Dispatch<React.SetStateAction<IPhoto[]>>;
}

interface IEventContextProvider {
    children: React.ReactNode;
}

const EventContext = React.createContext<IEventContext | undefined>(undefined);

export const EventContextProvider = ({ children }: IEventContextProvider) => {
    const [eventPhotos, setEventPhotos] = useState<IPhoto[]>([]);

    return (
        <EventContext.Provider value={{ eventPhotos, setEventPhotos }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEventContext = () => {
    const context = useContext(EventContext);
    if (context === undefined) {
        throw new Error('useEventContext must be used within a EventContextProvider');
    }
    return context;
};
