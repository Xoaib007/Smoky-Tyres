import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllSellers = () => {

    const { data: seller = [], refetch } = useQuery({
        queryKey: ['booking'],
        queryFn: () => fetch('http://localhost:5000/user/sellers').then(res => res.json())
    })

    const handleVerify = (data) =>{
        const verifiedSeller= data;

        fetch(`http://localhost:5000/user/sellers/${verifiedSeller}`,{
            method: 'PATCH',
            headers:{
                'content-type': 'application/json'
            }
        })
        .then(res=> res.json())
        .then(data=> refetch())
    }

    const handleDeleteUser = (data)=>{
        fetch(`http://localhost:5000/users/${data.email}`,{
            method: 'DELETE',
        })
        .then(res=> res.json())
        .then(data=> refetch())
    }

    return (
        <div>
            <div>
                <div>
                    <div className="overflow-x-auto w-full mt-10">
                        <table className="table w-full bg-transparent ">
                            {/* <!-- head --> */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {/* <!-- row 1 --> */}
                                {
                                    seller?.map((seller, i) =>
                                        <tr key={seller._id}>
                                            <th>{i + 1}</th>
                                            <td>{seller.name}</td>
                                            <td>{seller.email}</td>
                                            <td>
                                                {
                                                    seller.isVerified === false ?
                                                        <>
                                                            <button onClick={()=> handleVerify(seller._id)} className="btn btn-xs bg-red-600 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600 mr-5" >Verify</button>
                                                        </>
                                                        :
                                                        <>
                                                            <button className="btn btn-xs bg-green-600 rounded-none border-2 border-green-600 hover:bg-green-600 cursor-not-allowed hover:text-white hover:border-2 hover:border-green-600 mr-5" >Verified</button>
                                                        </>
                                                }
                                            </td>
                                            
                                            <td>
                                                <button onClick={() => handleDeleteUser(seller)} className='btn btn-xs bg-red-600 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600 mr-5'>Delete User</button>
                                            </td>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllSellers;