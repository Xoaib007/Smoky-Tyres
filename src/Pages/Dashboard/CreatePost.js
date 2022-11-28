import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthProvider';

const CreatePost = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const { user } = useContext(authContext);

    const current = new Date();

    // it adds 2 days to a current date
    current.setDate(current.getDate());

    const imgBBKey = process.env.REACT_APP_imageBB_Key;

    const { data: categories = [] } = useQuery({
        queryKey: ['category'],
        queryFn: () => fetch(`https://smoky-tyres-server.vercel.app/categories`).then(res => res.json())
    })

    const handleAddPost = (data, e) => {

        console.log(data)
        const form = e.target;
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image);

        const imgUrl = `https://api.imgbb.com/1/upload?key=${imgBBKey}`;

        fetch(imgUrl, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(img => {
                if (img.success) {
                    const post = {
                        year: data.year,
                        brand: data.brand,
                        model: data.model,
                        category: data.category,
                        photo: img.data.url,
                        engene: data.engene,
                        fuel: data.fuel,
                        about: data.about,
                        askingPrice: data.askingPrice,
                        originalPrice: data.originalPrice,
                        topSpeed: data.topSpeed,
                        kmDriven: data.kmDriven,
                        seller: user.displayName,
                        sellerEmail: user.email,
                        addedDate: current.toDateString()
                    }

                    fetch('https://smoky-tyres-server.vercel.app/cars', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(post)
                    })
                        .then(res => res.json())
                        .then(result => {
                            toast.success('Post created successfully')
                            form.reset();
                            navigate('/dash/seller/addedproducts')
                        })
                }
            })
    }

    return (
        <div className="hero min-h-screen w-full">
            <div className="card flex-shrink-0">
                <form onSubmit={handleSubmit(handleAddPost)} className="card-body pl-10">
                    <div className='flex'>
                        <div className="form-control w-32">
                            <label className="label">
                                <span className="label-text pr-2">Year</span>
                            </label>
                            <input {...register("year")} type="number" defaultValue='2022' min="1999" max="2022" className="input input-bordered " required />
                        </div>
                        <div className="form-control w-72 px-2">
                            <label className="label">
                                <span className="label-text">Brand</span>
                            </label>
                            <input {...register("brand", { required: true })} type="text" placeholder="Brand" className="input input-bordered" required />
                        </div>
                        <div className="form-control w-96 px-2">
                            <label className="label">
                                <span className="label-text">Model</span>
                            </label>
                            <input {...register("model", { required: true })} type="text" placeholder="Model" className="input input-bordered" required />
                        </div>
                        <div className="form-control w-96">
                            <label className="label">
                                <span className="label-text pl-2">Category</span>
                            </label>
                            <select  {...register("category")} className="select select-bordered w-full h-10 bg-white border-gray-400" required>
                                {
                                    categories?.map(category =>
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>


                    <div className='flex'>
                        <div>

                            <div className='flex'>
                                <div className="form-control w-52 pr-2">
                                    <label className="label">
                                        <span className="label-text">Engene</span>
                                    </label>
                                    <input {...register("engene", { required: true })} type="text" placeholder="Engene" className="input input-bordered" required />
                                </div>

                                <div className="form-control w-52 px-2">
                                    <label className="label">
                                        <span className="label-text">Fuel Type</span>
                                    </label>
                                    <select  {...register("fuel")} className="select select-bordered bg-white border-gray-400" required>
                                        <option>Petrol</option>
                                        <option>Diesel</option>
                                        <option>Electric</option>
                                        <option>Hybrid</option>
                                    </select>
                                </div>

                                <div className="form-control w-52 px-2">
                                    <label className="label">
                                        <span className="label-text">Top Speed</span>
                                    </label>
                                    <input {...register("topSpeed", { required: true })} type="text" placeholder="Top Holder" className="input input-bordered" required />
                                </div>

                                <div className="form-control w-52 pl-2">
                                    <label className="label">
                                        <span className="label-text">Total Drive (KM)</span>
                                    </label>
                                    <input {...register("kmDriven", { required: true })} type="text" placeholder="kmDriven" className="input input-bordered" required />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className="form-control w-96 pr-2">
                                    <label className="label">
                                        <span className="label-text">Asking Price $</span>
                                    </label>
                                    <input {...register("askingPrice", { required: true })} type="text" placeholder="askingPrice" className="input input-bordered" required />
                                </div>

                                <div className="divider lg:divider-horizontal pt-10"></div>

                                <div className="form-control w-96 pl-2">
                                    <label className="label">
                                        <span className="label-text">Original Price $</span>
                                    </label>
                                    <input {...register("originalPrice", { required: true })} type="text" placeholder="originalPrice" className="input input-bordered" required />
                                </div>
                            </div>
                        </div>

                        <div className="form-control w-full px-4">
                            <label className="label">
                                <span className="label-text">Photo (please provide a good quality photo)</span>
                            </label>
                            <input {...register("photo", { required: true, message: "Photo is required" })} type="file" placeholder="email" className="input input-bordered border-dashed border-2  bg-white border-gray-400 h-32" required />
                        </div>
                    </div>

                    <div className='flex'>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">About</span>
                            </label>
                            <textarea {...register("about", { required: true })} type="text" placeholder="About
                            " className=" textarea textarea-bordered h-40" required />
                        </div>
                        <div className='pt-8 pl-20'>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input type="checkbox" className="checkbox rounded-none" required />
                                    <p className="label-text text-left text-md ml-3">Make sure the car have no <span className='font-bold'>accident history</span>. </p>

                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input type="checkbox" className="checkbox rounded-none" required />
                                    <p className="label-text text-left ml-3">Make sure the car have no <span className='font-bold'>litigation</span>.</p>

                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input type="checkbox" className="checkbox rounded-none" required />
                                    <p className="label-text text-left ml-3">Make sure the <span className='font-bold'>odometere</span> of the car isn't tempered.</p>
                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label cursor-pointer">
                                    <input type="checkbox" className="checkbox rounded-none" required />
                                    <p className="label-text text-left ml-3">You must be aware that, we'll take legal action if you provide any false or misleading information, or we find anything wrong from our legal check.</p>
                                </label>
                            </div>
                        </div>
                    </div>
                    <p className='text-left text-blue-900'>***Please know that, the post will be approved after a insurence check, a physical check and a legal check by our dedicated team.</p>
                    <div className="form-control w-1/2 mx-auto">
                        <button type='submit' className="btn bg-red-600 rounded-none outline-none">Post</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreatePost;