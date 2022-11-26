import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../Context/AuthProvider';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(authContext);
    const location =  useLocation();
    if(loading){
        return <div className='h-screen w-full relative bottom-1/2'><progress className="progress w-72 relative top-1/2 mx-auto"></progress></div>
    }
    if(user){
        return children;
    }
    return <Navigate to='/user/login' state={{from: location}} replace></Navigate>;
};

export default PrivateRoutes;