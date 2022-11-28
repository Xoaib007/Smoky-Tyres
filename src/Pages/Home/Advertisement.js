import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Advertisement = () => {

    const [advertisement, setAdvertisement]= useState();
    
    useEffect(()=>{
        fetch('https://smoky-tyres-server.vercel.app/advertise')
        .then(res=> res.json())
        .then(data=> setAdvertisement(data))
    },[])

    return (
        <div>
            <div className=' w-fit px-10 border-x-8 border-red-600 mx-auto mb-20'>
                <p className='text-3xl font-bold '>Whats New!!!</p>
            </div>

            <div className='grid gap-6 mx-32 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 justify-items-center mb-20'>
                {
                    advertisement?.map(advertisedPost =>
                        <div key={advertisedPost._id} className=" program card card-compact w-96 bg2 h-fit rounded-3xl">
                        <div>
                            <img className='card-image rounded-3xl' src={advertisedPost.photo} alt="" />
                        </div>
                        <div className="card-body">
                            <div className='flex flex-col '>
                                <h2 className="card-title text-2xl text-center font-bold">{advertisedPost.brand} {advertisedPost.model}</h2>

                                <div className="align flex mt-4">
                                    <p className='font-bold text-left'>Asking Price: ${advertisedPost.askingPrice}</p>
                                    <p className='font-bold text-red-600 mx-auto text-center'>I</p>
                                    <p className='font-bold text-right'>Original Price: ${advertisedPost.originalPrice}</p>
                                </div>
                                <p className='font-bold text-left mt-4'>Total Driven <span className='text-red-600'>{advertisedPost.kmDriven}Km</span></p>
                                <p className='mt-5 text-left text-xl pb-0 w-fit h-fit border-b-4 border-red-600 font-semibold'>Details</p>
                                <div>
                                    <p className='text-left'>{advertisedPost.about.slice(0, 100) + '...'}</p>
                                </div>
                                <p className='text-left font-bold mt-6'>Posted By: {advertisedPost.seller}</p>

                            </div>
                            <Link to={`/cars/id/${advertisedPost._id}`} className='btn btn-lg bg-transparent text-black
                                border-none hover:bg-transparent hover:text-red-600 relative left-28 px-0 mx-0 '
                            ><FontAwesomeIcon className='h-8 w-8' icon={faAngleRight} /></Link>

                        </div>
                    </div>
                    )
                }
            </div>

        </div>
    );
};

export default Advertisement;