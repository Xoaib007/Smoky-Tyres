import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../Context/AuthProvider';

const SellerRoute = ({children}) => {
    const {user, loading} = useContext(authContext);
    const location =  useLocation();

    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        if (user?.email) {
            fetch(`https://smoky-tyres-server.vercel.app/users/${user?.email}`).then(res => res.json()).then(data => {
                setCurrentUser(data)
            })
        }
    }, [user?.email])

    if(loading || !currentUser){
        return <div className='h-screen w-full relative bottom-1/2'><progress className="progress w-72 relative top-1/2 mx-auto"></progress></div>
    }
    if(currentUser?.role === 'Seller'){
        return children;
    }
    return <Navigate to='/user/login' state={{from: location}} replace></Navigate>;
};

export default SellerRoute ;