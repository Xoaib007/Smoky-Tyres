import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';

const CategoryPage = () => {
    const { data: categories = [] } = useQuery({
        queryKey: ['category'],
        queryFn: () => fetch(`http://localhost:5000/categories`).then(res => res.json())
    })
    return (
        <div>
            <div className='mt-20 mb-40'>
                <div className=' w-fit px-10 border-x-8 border-red-600 mx-auto mb-20'>
                    <p className='text-4xl font-bold '>All Categories</p>
                </div>
                <div className='w-4/5 mx-auto grid grid-cols-4 gap-0'>

                    {
                        categories?.map(category =>
                            <Link to={`/cars/${category._id}`} key={category._id} className='w-fit'>
                                <div className="w-72">
                                    <div className="px-5 h-80 pt-5 pb-36 mx-14 rounded-full bg2 shadow-2xl ">
                                        <div className="w-24 h-24 px-6 py-7 mb-5 mx-auto rounded-full bg-white">
                                            <img src={`${category.icon}`} alt="Eco-friendly" className='relative bottom-1' />
                                        </div>
                                        <span className="font-bold">{category.name}</span>
                                    </div>
                                    <img src={`${category.model}`} alt="Eco-friendly" className="relative bottom-28 left-3 hover:left-8" />
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;