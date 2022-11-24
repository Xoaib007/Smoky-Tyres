import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './General.css'

const Header = () => {
    const navItems = <>
        <NavLink className='btn bg-transparent border-none text-black hover:text-2xl hover:bg-transparent rounded-none' to='/'>Home</NavLink>
        <NavLink className='btn bg-transparent border-none text-black hover:bg-black hover:text-white rounded-none' to='/appointment'>Categories</NavLink>
        <NavLink className='btn bg-transparent border-none text-black hover:bg-black hover:text-white rounded-none' to=''>Blog</NavLink>
        <NavLink className='btn bg-transparent border-none text-black hover:bg-black hover:text-white rounded-none' to=''>Contact Us</NavLink>
        <NavLink className='btn bg-transparent border-none text-black hover:bg-black hover:text-white rounded-none' to=''>About</NavLink>
    </>
    return (
        <div>
            <div className="navbar mt-0 py-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navItems}
                            <Link className="btn bg-red-600 border-none text-black rounded-none">Get started</Link>
                        </ul>
                    </div>
                    <div className='flex'>
                        <img src='https://i.ibb.co/Yjqx7p5/ei-1669230605202-removebg.png' className='w-20' alt='' />
                        <div className='text-left mt-3'>
                            <p className='text-3xl m-0 font-extrabold logo'>Smoky</p>
                            <p className='text-3xl m-0 font-extrabold logo'>Tyres</p>
                        </div>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {navItems}
                    </ul>
                </div>
                <div className='navbar-end lg:block text-right hidden'>
                    <Link className="btn bg-red-600 border-none text-white hover:bg-black hover:text-white rounded-none">Get started</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;