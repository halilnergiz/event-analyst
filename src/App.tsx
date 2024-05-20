import { Outlet } from 'react-router-dom';

import './config/axios_config';

function App() {
    return (
        <>
            <Outlet />
        </>
    );
}

export default App;