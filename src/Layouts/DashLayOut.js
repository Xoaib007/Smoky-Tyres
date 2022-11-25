import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Components/Shared/Footer';
import Header from '../Components/Shared/Header';
import { authContext } from '../Context/AuthProvider';

const DashLayOut = () => {
    const { user } = useContext(authContext);

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/users/${user?.email}`).then(res => res.json()).then(data => {
                setCurrentUser(data)
            })
        }
    }, [user?.email])

    return (
        <div>


            <Header/>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center bg-red-100">
                    {/* <!-- Page content here --> */}
                    <Outlet/>

                </div>
                <div className="drawer-side bg-white pt-20">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        {
                            currentUser?.role === 'Buyer' ?
                                <>
                                    <li><Link>My Orders</Link></li>
                                </>
                            : currentUser?.role === 'Seller' ?
                                <>
                                    <li><Link to='/dash/addproduct'>Post a Car</Link></li>
                                    <li><Link>My Posts</Link></li>
                                </>
                            : currentUser?.role === 'Admin' ?
                                <>
                                    <li><Link>All Buyers</Link></li>
                                    <li><Link>All Sellers</Link></li>
                                    <li><Link>Reported Items</Link></li>
                                </>
                            :
                                <>
                                    <Link>Sign In to use Dashboard</Link>
                                </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashLayOut;