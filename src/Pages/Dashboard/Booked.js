import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../Context/AuthProvider';

const Booked = () => {

    const { user } = useContext(authContext);

    console.log(user)

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['booking'],
        queryFn: () => fetch(`http://localhost:5000/testdrivebooking/buyer/${user?.email}`).then(res => res.json())
    })

    const handleCancelBooking = (data) => {
        console.log(data)
        fetch(`http://localhost:5000/testdrivebooking/${data}`, {
            method: 'DELETE'
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                }
            })
    }

    return (
        <div>
            <div className="overflow-x-auto w-full mt-10">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Booked For:</th>
                            <th>Date & Time</th>
                            <th>Location</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings?.map((booking, i) =>
                                <tr key={booking._id}>
                                    <th>{i + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={booking.testDriveFor3} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{booking.testDriveFor2}</div>
                                                <div className="text-sm opacity-50">posted by: {booking.seller}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {booking.requestedDate}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{booking.requestedTime}</span>
                                    </td>
                                    <td>{booking.requestedLocation}</td>
                                    <td>
                                        <Link to={`/cars/id/${booking.testDriveFor}`} className="btn btn-xs bg-red-600 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600 mr-5">Details</Link>

                                        {
                                            booking.isPaid === false?
                                            <>
                                                <Link to={`/buyer/bookings/${booking._id}`} className="btn btn-xs bg-red-600 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600 mr-5">Confirm Booking</Link>

                                                <label htmlFor="my-modal-6" className="btn btn-xs bg-red-600 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600">Cancel Booking</label>
                                            </>
                                            :
                                            <button className="btn btn-xs bg-red-600 rounded-none border-2 border-red-600 hover:bg-red-600 cursor-not-allowed hover:text-white hover:border-2 hover:border-red-600 mr-5" >Paid</button>

                                        }

                                        
                                    </td>

                                    {/* Cancel Booking Confirmation Modal */}
                                    <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                                    <div className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box rounded-none">
                                            <p className="py-4 mt-10 font-semibold text-lg">Are you sure you want to delete the booking for a test drive of {booking.testDriveFor2} at {booking.requestedLocation} on {booking.requestedDate}?</p>

                                            <div className="modal-action">
                                                <label htmlFor="my-modal-6" className="btn p-2 w-32 bg-red-600 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600">Cancel</label>

                                                <button onClick={() => handleCancelBooking(booking._id)} htmlFor="my-modal-6" className="btn w-32 bg-red-600 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600">Confirm</button>
                                            </div>
                                        </div>
                                    </div>
                                </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Booked;