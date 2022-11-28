import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import svg from '../bookmark-solid.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { authContext } from '../Context/AuthProvider';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import TestDriveModal from './TestDriveModal';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const SingleCar = () => {
    const [modal, setModal] = useState(null );

    const car = useLoaderData();
    const { user } = useContext(authContext);

    const navigate = useNavigate();

    const { data: savedCar = [], refetch} = useQuery({
        queryKey: ['booking'],
        queryFn: () => fetch(`https://smoky-tyres-server.vercel.app/savedpost/${car._id}`).then(res => res.json())
    })

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://smoky-tyres-server.vercel.app/users/${user?.email}`).then(res => res.json()).then(data => {
                setCurrentUser(data)
            })
        }
    }, [user?.email])

    const handleSaveCar= ()=>{
        const savedcar = {
            buyer: currentUser._id,
            buyerName: currentUser.name,
            buyerEmail: currentUser.email,
            car: car._id,
            carName: car.year+' '+car.brand+' '+car.model,
            carSeller: car.seller,
            carPhoto: car.photo
        }
        fetch('https://smoky-tyres-server.vercel.app/savedpost',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(savedcar)
        })
        .then(res=> res.json())
        .then(data=> {
            toast.success('Post saved successfully!!!')
            refetch()})
    }

    const handleReport= (data)=>{
        const reportcar = {
            buyer: currentUser._id,
            buyerName: currentUser.name,
            buyerEmail: currentUser.email,
            car: car._id,
            carName: car.year+' '+car.brand+' '+car.model,
            carSeller: car.seller,
            carPhoto: car.photo
        }
        fetch('https://smoky-tyres-server.vercel.app/reportedpost',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(reportcar)
        })
        .then(res=> res.json())
        .then(data=> {
            toast.success('Your report has been submitted. Admin will preview this post. Thanks')
            refetch()
        })
    }

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

                    {
                        currentUser?.role === 'Buyer' ?
                            <>
                                <div className='flex'>
                                    <label onClick={() => setModal(car)} htmlFor='TestDriveModal' className="w-96 btn bg-red-600 text-xl font-bold hover:border-red-600 hover:bg-white hover:text-red-600 rounded-none mt-10">Book a test drive now!!</label>
                                    {
                                        savedCar.length > 0 ?
                                        <div className='mt-1'><img className='w-9 h-9 mt-10 ml-8' src={svg} alt='' /></div>
                                        :
                                        <button onClick={handleSaveCar} className=''><FontAwesomeIcon className='w-9 h-9 mt-10 ml-8' icon={faBookmark} /></button>

                                    }
                                    
                                </div>
                            </>
                            :
                            <>
                                <button className='w-96 btn bg-red-600 text-xl font-bold hover:border-red-600 hover:bg-white hover:text-red-600 rounded-none mt-10'>Book a test drive now!!</button>
                            </>
                    }

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
            {
                    currentUser?.role === 'Buyer' ?
                    <button onClick={()=>handleReport(car)} className='btn bg-white border-x-2 border-t-2 border-black rounded-none text-black hover:bg-black hover:text-white'>Report about this post</button>
                    :
                    <p></p>
                }

            {
                modal &&
                <TestDriveModal
                modal= {modal}
                setModal={setModal}
                currentUser={currentUser}
            />}
        </div>
    );
};

export default SingleCar;