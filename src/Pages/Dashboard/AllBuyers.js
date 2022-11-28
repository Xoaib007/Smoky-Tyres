import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllBuyers = () => {

    const { data: buyers = [], refetch } = useQuery({
        queryKey: ['booking'],
        queryFn: () => fetch(`http://localhost:5000/user/buyers`).then(res => res.json())
    })

    const handleVerify = (data) =>{
        const verifiedBuyer= data;

        fetch(`http://localhost:5000/user/buyers/${verifiedBuyer}`,{
            method: 'PATCH',
            headers:{
                'content-type': 'application/json'
            }
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
                                </tr>
                            </thead>
                            <tbody className=''>
                                {/* <!-- row 1 --> */}
                                {
                                    buyers?.map((buyer, i) =>
                                        <tr key={buyer._id}>
                                            <th>{i + 1}</th>
                                            <td>{buyer.name}</td>
                                            <td>{buyer.email}</td>
                                            <td>
                                            {
                                                buyer.isVerified === false ?
                                                <>
                                                    <button onClick={()=>handleVerify(buyer._id)} className="btn btn-xs bg-red-600 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600 mr-5" >Verify</button>
                                                </>
                                                :
                                                <>
                                                    <button className="btn btn-xs bg-green-600 rounded-none border-2 border-green-600 hover:bg-green-600 cursor-not-allowed hover:text-white hover:border-2 hover:border-green-600 mr-5" >Verified</button>
                                                </>
                                            }
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

export default AllBuyers;