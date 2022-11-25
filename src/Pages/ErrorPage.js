import React from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='errorbanner h-screen'>
            <div className='pt-20'>
                <p className='text-white text-3xl font-bold'>404 error</p>
                <p className='text-white text-3xl font-bold mt-5'>Looks Like This Page Does'nt Exist!!!</p>
                <Link to='/' className='w-56 mt-16 btn btn-outline rounded-none border-white text-white hover:bg-white hover:text-black'><FontAwesomeIcon icon={faArrowLeft} className='w-6 h-6 mr-4'></FontAwesomeIcon>Go Back To Home</Link>
            </div>



        </div>
    );
};

export default ErrorPage;