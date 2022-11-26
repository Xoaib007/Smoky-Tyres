import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../Context/AuthProvider';

const AllPosts = () => {
    const { user } = useContext(authContext);

    const { data: allPosts = [] } = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/cars/email/${user?.email}`);
            const data = await res.json();
            return data;
        }
    });


    return (
        <div>
            <div>
                <div className="overflow-x-auto w-full mt-10">
                    <table className="table w-full bg-transparent ">
                        {/* <!-- head --> */}
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Name</th>
                                <th>Asking Price</th>
                                <th>Driven</th>
                                <th>Added on</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {/* <!-- row 1 --> */}
                            {
                                allPosts?.map((post, i) =>
                                    <tr key={post._id}>
                                        <th>{i + 1}</th>
                                        <td>
                                            <div className="flex items-center">
                                                <div className="mask mask-squircle avatar">
                                                    <div className=" w-12 h-12">
                                                        <img src={`${post.photo}`} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <div>
                                                    
                                                    <div className="text-sm opacity-50">{post.year}{post.brand}</div>
                                                    <div className="font-bold text-xl">{post.model}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>${post.askingPrice}</td>
                                        <td>{post.kmDriven} km</td>
                                        <td>{post.addedDate}</td>
                                        <th>
                                            <Link to={`/cars/id/${post._id}`} className="btn bg-red-600 rounded-none btn-xs">Details</Link>
                                        </th>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllPosts;