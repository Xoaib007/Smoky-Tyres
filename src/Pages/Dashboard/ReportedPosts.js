import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const ReportedPosts = () => {

    const { data: reportedPost = [], refetch } = useQuery({
        queryKey: ['reported'],
        queryFn: () => fetch(`http://localhost:5000/reportedpost`).then(res => res.json())
    })

    const handleDeletePost = (data) => {
        fetch(`http://localhost:5000/cars/${data.car}`, {
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

        fetch(`http://localhost:5000/reportedpost/${data.car}`, {
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
                            reportedPost?.map((reported, i) =>
                            <tr key={reported._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="flex items-center">
                                        <div className="mask mask-squircle avatar">
                                            <div className=" w-12 h-12">
                                                <img src={reported.carPhoto} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{reported.carName}</td>
                                <td>{reported.carSeller}</td>
                                <td>
                                    <Link to={`/cars/id/${reported.car}`} className='btn btn-xs bg-red-600 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600 mr-5'>View Details</Link>
                                </td>
                                <td>
                                    <label htmlFor='delete-post' className='btn btn-xs bg-red-600 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600 mr-5'>Delete Post</label>
                                </td>

                                {/* Delete Post Confirmation Modal */}
                                <input type="checkbox" id="delete-post" className="modal-toggle" />
                                    <div className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box rounded-none">
                                            <p className="py-4 mt-10 font-semibold text-lg">Are you sure you want to delete the post of {reported.carName} posted by {reported.carSeller}?</p>

                                            <div className="modal-action">
                                                <label htmlFor="delete-post" className="btn p-2 w-32 bg-red-600 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600">Cancel</label>

                                                <button onClick={()=>handleDeletePost(reported)} htmlFor="delete-post" className="btn w-32 bg-red-600 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 hover:border-2 hover:border-red-600">Confirm</button>
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

export default ReportedPosts;