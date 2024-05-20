import React, { createContext, useContext, useState } from 'react';

import { IEvents } from '../types';


interface IDashContext {
    events: IEvents[];
    setEvents: React.Dispatch<React.SetStateAction<IEvents[]>>;
}

export const DashContext = createContext<IDashContext | undefined>(undefined);

interface IDashContextProvider {
    children: React.ReactNode;
}

const DashContextProvider = ({ children }: IDashContextProvider) => {
    const [events, setEvents] = useState<IEvents[]>([]);

    return (
        <DashContext.Provider value={{ events, setEvents }}>
            {children}
        </DashContext.Provider>
    );
};

export default DashContextProvider;


export const useDashContext = () => {
    const context = useContext(DashContext);
    if (context === undefined) {
        throw new Error('useDashContext must be used within a DashContextProvider');
    }
    return context;
};
