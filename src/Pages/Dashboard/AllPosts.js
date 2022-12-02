import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { authContext } from '../../Context/AuthProvider';

const AllPosts = () => {
    const { user } = useContext(authContext);

    const { data: allPosts = []} = useQuery({
        queryKey: ['allPosts'],
        queryFn: async () => {
            const res = await fetch(`https://smoky-tyres-server.vercel.app/cars/email/${user?.email}`);
            const data = await res.json();
            return data;
        }
    });


    const handleAdvertise= (data)=>{
        fetch('https://smoky-tyres-server.vercel.app/advertise',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=> res.json())
        .then(data => toast.success('Post added to advertisement'))
    }
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
                                        <td>
                                            <Link to={`/cars/id/${post._id}`} className="btn bg-red-600 rounded-none btn-xs">Details</Link>
                                        </td>
                                        <td>
                                        <button onClick={()=>handleAdvertise(post)} className="btn btn-xs bg-red-600 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600">Advertise</button>
                                        
                                            
                                        </td>
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