import React, { useContext, useState } from 'react';

import { IEvent } from '../types';


interface IDashContext {
    events: IEvent[];
    setEvents: React.Dispatch<React.SetStateAction<IEvent[]>>;
}

interface IDashContextProvider {
    children: React.ReactNode;
}

const DashContext = React.createContext<IDashContext | undefined>(undefined);

export const DashContextProvider = ({ children }: IDashContextProvider) => {
    const [events, setEvents] = useState<IEvent[]>([]);

    return (
        <DashContext.Provider value={{ events, setEvents }}>
            {children}
        </DashContext.Provider>
    );
};

export const useDashContext = () => {
    const context = useContext(DashContext);
    if (context === undefined) {
        throw new Error('useDashContext must be used within a DashContextProvider');
    }
    return context;
};
