import React, { useContext, useState } from 'react';

import { IEvent, IPhoto } from '../types';


interface IEventContext {
    eventPhotos: IPhoto[];
    setEventPhotos: React.Dispatch<React.SetStateAction<IPhoto[]>>;
    eventInformations: IEvent | undefined;
    setEventInformations: React.Dispatch<React.SetStateAction<IEvent | undefined>>;
}

interface IEventContextProvider {
    children: React.ReactNode;
}

const EventContext = React.createContext<IEventContext | undefined>(undefined);

export const EventContextProvider = ({ children }: IEventContextProvider) => {
    const [eventPhotos, setEventPhotos] = useState<IPhoto[]>([]);
    const [eventInformations, setEventInformations] = useState<IEvent>();

    return (
        <EventContext.Provider value={{ eventPhotos, setEventPhotos, eventInformations, setEventInformations }}>
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
