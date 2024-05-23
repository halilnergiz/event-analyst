import React, { useContext, useState } from 'react';


interface IEventContext {
    isPhotoExist: boolean;
    setIsPhotoExist: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IEventContextProvider {
    children: React.ReactNode;
}

const EventContext = React.createContext<IEventContext | undefined>(undefined);

export const EventContextProvider = ({ children }: IEventContextProvider) => {
    const [isPhotoExist, setIsPhotoExist] = useState<boolean>(false);

    return (
        <EventContext.Provider value={{ isPhotoExist, setIsPhotoExist }}>
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
