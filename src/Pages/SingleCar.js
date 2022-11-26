import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SingleCar = () => {
    const car = useLoaderData();

    const navigate = useNavigate();

    return (
        <div className='min-h-screen'>
            <button onClick={() => navigate(-1)} className='w-fit relative right-1/3 top-20 hover:text-red-600'><FontAwesomeIcon className='w-10 h-10' icon={faArrowLeft}></FontAwesomeIcon></button>

            <div className='flex justify-around mt-32'>
                <div className=' ml-32 mt-20'>
                    <div className='pl-3 py-0 w-fit border-l-8 border-red-600'>
                        <p className='text-5xl text-left font-bold'>{car.brand}</p>
                        <p className='text-3xl text-left font-bold'>{car.model}</p>
                    </div>
                    <p className='text-left text-xl font-bold mt-10 mb-5'>Asking Price: <br /><span className='text-red-600 text-2xl'>${car.askingPrice}</span></p>
                    <p className='text-left text-xl font-bold'>Original Price: <br /><span className='text-red-600 text-2xl'>${car.originalPrice}</span></p>
                    <p className='text-left mt-10 font-bold'>Added on: {car.addedDate}</p>
                    <p className='text-left mt-5 font-bold'>By: {car.seller}</p>
                    <button className='w-96 btn bg-red-600 text-xl font-bold hover:border-red-600 hover:bg-white hover:text-red-600 rounded-none mt-10'>Book a test drive now!!</button>
                </div>
                <img className='w-5/12' src={car.photo} alt='' />
            </div>

            <div className='mb-40 flex justify-around'>
                <div className='grid grid-cols-2 gap-20 bg-red-600 w-5/12 h-96 ml-32 mt-40 p-20'>
                    <div>
                        <div className='w-full flex justify-center mb-2'>
                            <img src='https://cdn.bigboytoyz.com/newcar/img/car-setting-icon.png' alt='' />
                        </div>
                        <p className='text-xl text-white font-bold'>{car.engene}</p>
                    </div>

                    <div>
                        <div className='w-full flex justify-center mb-2'>
                            <img src='https://cdn.bigboytoyz.com/newcar/img/nlc-mpg-icon.png' alt='' />
                        </div>
                        <p className='text-xl text-white font-bold'>{car.fuel}</p>
                    </div>

                    <div>
                        <div className='w-full flex justify-center mb-2'>
                            <img src='https://cdn.bigboytoyz.com/newcar/img/car-meter-icon.png' alt='' />
                        </div>
                        <p className='text-xl text-white font-bold'>{car.topSpeed} kmph</p>
                    </div>

                    <div>
                        <div className='w-full flex justify-center mb-2'>
                            <img src='https://cdn.bigboytoyz.com/newcar/img/car-seat-icon.png' alt='' />
                        </div>
                        <p className='text-xl text-white font-bold'>{car.kmDriven}km driven</p>
                    </div>
                </div>

                <div className='h-97 w-5/12 h-96 mr-20 mt-48 ml-20'>
                    <div className='mb-5 pr-3 py-0 border-r-8 border-red-600'>
                        <p className=' text-5xl font-bold text-right'>Details</p>
                    </div>
                    <p className='text-right'>{car.about}</p>
                </div>
            </div>
        </div>
    );
};

export default SingleCar;