import { Outlet } from 'react-router-dom';

export const Main = () => {
    return (
        <div className='main'>
            <Outlet />
        </div>
    );
};