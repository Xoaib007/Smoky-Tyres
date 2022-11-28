import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../Context/AuthProvider';

const SavedCars = () => {
    const { user } = useContext(authContext)

    const { data: savedCars = [], refetch } = useQuery({
        queryKey: ['savedCrs'],
        queryFn: () => fetch(`http://localhost:5000/savedpost/user/${user.email}`).then(res => res.json())
    })

    const handleRemove = (data) => {
        fetch(`http://localhost:5000/savedpost/${data.car}`, {
            method: 'DELETE',
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
                <table className="table w-full bg-transparent ">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>Posted By</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {/* <!-- row 1 --> */}
                        {
                            savedCars?.map((saved, i) =>
                            <tr key={saved._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="flex items-center">
                                        <div className="mask mask-squircle avatar">
                                            <div className=" w-12 h-12">
                                                <img src={saved.carPhoto} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{saved.carName}</td>
                                <td>{saved.carSeller}</td>
                                <td>
                                    <Link to={`/cars/id/${saved.car}`} className='btn btn-xs bg-red-600 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600 mr-5'>View Details</Link>
                                </td>
                                <td>
                                    <button onClick={() => handleRemove(saved)} className='btn btn-xs bg-red-600 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600 mr-5'>Remove from saved</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SavedCars;