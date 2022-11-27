import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { faAngleRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AllCars = () => {
    const cars = useLoaderData();

    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate(-1)} className='w-fit relative right-1/3 top-10 mb-10 hover:text-red-600'><FontAwesomeIcon className='w-10 h-10' icon={faArrowLeft}></FontAwesomeIcon></button>
            
            <div className='grid gap-6 mx-32 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 justify-items-center mb-20 min-h-screen'>
            
            {
                cars?.map(car =>
                    <div key={car._id} className=" program card card-compact w-96 bg2 h-fit rounded-3xl">
                        <div>
                            <img className='card-image rounded-3xl' src={car.photo} alt="" />
                        </div>
                        <div className="card-body">
                            <div className='flex flex-col '>
                                <h2 className="card-title text-2xl text-center font-bold">{car.brand} {car.model}</h2>

                                <div className="align flex mt-4">
                                    <p className='font-bold text-left'>Asking Price: ${car.askingPrice}</p>
                                    <p className='font-bold text-red-600 mx-auto text-center'>I</p>
                                    <p className='font-bold text-right'>Original Price: ${car.originalPrice}</p>
                                </div>
                                <p className='font-bold text-left mt-4'>Total Driven <span className='text-red-600'>{car.kmDriven}Km</span></p>
                                <p className='mt-5 text-left text-xl pb-0 w-fit h-fit border-b-4 border-red-600 font-semibold'>Details</p>
                                <div>
                                    <p className='text-left'>{car.about.slice(0, 100) + '...'}</p>
                                </div>
                                <p className='text-left font-bold mt-6'>Posted By: {car.seller}</p>

                            </div>
                            <Link to={`/cars/id/${car._id}`} className='btn btn-lg bg-transparent text-black
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

export default AllCars;



// {program.details.slice(0, 100) + '...'}