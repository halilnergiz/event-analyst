import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { EventAnalyses, Login, NoMatch, Profile, Register, UploadPhotos } from './pages/index';
import { Dashboard } from './layouts';
import { Home } from './pages/Home/Home';

function App() {
    return (
        <>
            <Routes>
                <Route index element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<Dashboard />} >
                    <Route index element={<Home />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='events/:eventId' element={<EventAnalyses />} />
                    <Route path='events/:eventId/upload-photos' element={<UploadPhotos/>} />
                </Route>
                <Route path='*' element={<NoMatch />} />
            </Routes>
        </>
    );
}
export default App;
