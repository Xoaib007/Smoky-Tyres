import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Shared/Header';

const AuthenticatioPage = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default AuthenticatioPage;