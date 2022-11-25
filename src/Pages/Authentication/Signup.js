import React from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Signup = () => {
    const { register, formState: { errors } } = useForm();

    return (
        <div>
            <div className="hero min-h-screen bg3">
                <div className="hero-content lg:w-6/12 bg-transparent relative left-80 ">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-transparent ">
                        <h1 className="text-5xl font-bold ml-8 text-white">Sign Up</h1>
                        <form className="card-body">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-white">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" placeholder="Full Name" className="input input-bordered" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-white">Email</span>
                                </label>
                                <input {...register("email", { required: true, message: "Email Address is required" })} type="text" placeholder="email" className="input input-bordered" />
                                {errors.mail && <p className='text-error' role="alert">{errors.mail?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Password</span>
                                </label>
                                <input {...register("password", { required: true, minLength: { value: 7, message: 'Password must be longer than 7 charecter' } })} type="password" placeholder="password" className="input input-bordered" />
                                {errors.password && <p className='text-error' role="alert">{errors.password?.message}</p>}
                                <label className="label">
                                    <Link href="#" className="label-text-alt link link-hover text-white">Forgot password?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-3">
                                <button type='submit' className="btn bg-red-600 text-white rounded-none hover:bg-white hover:text-black">Sign Up</button>
                            </div>
                            <p className='text-white'>Already have an account? <Link to='/user/login' className='text-red-600 font-bold hover:text-xl'>Log in</Link></p>

                            <div className="divider text-white">OR</div>

                            <div>
                                <button className='flex justify-center mx-auto mb-5'>
                                    <FontAwesomeIcon className=' w-6 h-6 border-black  p-2 rounded-full border-2  relative left-5 bg-white' icon={faGoogle} />
                                    <p className='border-black border-r-2 border-t-2 border-b-2 rounded-r-full p-2 pl-7 bg-white hover:text-red-600 hover:font-bold'>Sign Up with Google</p>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;