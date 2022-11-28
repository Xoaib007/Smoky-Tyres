import React from 'react';
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';

const Categories = () => {

    const { data: categoriesData = [] } = useQuery({
        queryKey: ['category'],
        queryFn: () => fetch(`https://smoky-tyres-server.vercel.app/categories`).then(res => res.json())
    })

    const categories= categoriesData.slice(3);
    return (
        
        <div className='mt-56'>
            <div className=' w-fit px-10 border-x-8 border-red-600 mx-auto mb-20'>
                <p className='text-3xl font-bold '>Categories</p>
            </div>
            <div className='lg:w-4/5 w-full mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-0'>

                {
                    categories?.map(category =>
                        <Link  to={`/category/${category._id}`} key={category._id} className='w-fit'>
                            <div className="lg:w-72 w-56">
                                <div className="px-5 h-80 pt-5 pb-36 mx-14 rounded-full bg2 shadow-2xl ">
                                    <div className="lg:w-24 lg:h-24 w-16 h-16 px-6 py-7 mb-5 mx-auto rounded-full bg-white">
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
            <Link to='/categories' className='btn rounded-none mb-32 w-1/3 bg-red-600  hover:bg-black text-white tracking-widest'>Browse All Categories</Link>
        </div>
    );
};

export default Categories;