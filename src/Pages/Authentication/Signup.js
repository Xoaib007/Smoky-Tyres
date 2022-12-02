import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { authContext } from '../../Context/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import toast from 'react-hot-toast';
// import { GoogleAuthProvider } from 'firebase/auth';

const Signup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUser, googleSignIn } = useContext(authContext);
    const [email, setEmail] = useState('');

    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const [passwordType, setPasswordType] = useState("password");

    const handleSignUp = data => {
        let role = data.role;
        if (role === true) {
            role = 'Seller'
        }
        else {
            role = 'Buyer'
        }

        const isVerified = false;

        createUser(data.email, data.password)
            .then(result => {
                const userInfo = {
                    displayName: data.name
                };

                updateUser(userInfo)
                    .then(() => {

                        saveUser(data.name, data.email, role, isVerified)
                    })
                    .catch(error =>toast.error(error))
                navigate(from, { replace: true })

            })

            .catch((error) => {
                toast.error(error)
            });

       

    }

    const handleGoogleSignIn = () => {
        const role= 'Buyer';
        const isVerified = false;
        googleSignIn(provider)
            .then(result => {
                const user= result.user;

                saveUser(user.displayName, user.email, role, isVerified)
                navigate(from, { replace: true })
            })
            .catch(error => toast.error(error))
    }

    const saveUser = (name, email, role, isVerified) => {
        const user = { name, email, role, isVerified };
        fetch('https://smoky-tyres-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(() => {
            toast.success('Successfully signed up')
            setEmail(email)
        })
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    return (
        <div>
            <div className="hero min-h-screen bg3">
                <div className="hero-content lg:w-6/12 bg-transparent lg:relative lg:left-80 ">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-transparent ">
                        <h1 className="text-5xl font-bold ml-8 text-white">Sign Up</h1>
                        <form onSubmit={handleSubmit(handleSignUp)} className="card-body">
                            <div className="form-control w-10/12 mx-auto">
                                <label className="label">
                                    <span className="label-text text-white">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" placeholder="Full Name" className="input input-bordered" />
                            </div>
                            <div className="form-control w-10/12 mx-auto">
                                <label className="label">
                                    <span className="label-text text-white">Email</span>
                                </label>
                                <input {...register("email", { required: true, message: "Email Address is required" })} type="text" placeholder="email" className="input input-bordered" />
                                {errors.mail && <p className='text-error' role="alert">{errors.mail?.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text ml-5 text-white">Password</span>
                                </label>
                                <div>
                                    <input {...register("password", { required: true, minLength: { value: 7, message: 'Password must be longer than 7 charecter' } })} type={passwordType} placeholder="password" className="input input-bordered rounded-r-none" />

                                    <button onClick={togglePassword} className="btn btn-outline-primary rounded-l-none bg-white text-black border-none focus:bg-white " >
                                        {
                                            passwordType === "password" ?
                                            <FontAwesomeIcon icon={faEye} />
                                            :
                                            <FontAwesomeIcon icon={faEyeSlash} />
                                        }
                                    </button>
                                </div>
                                {errors.password && <p className='text-error' role="alert">{errors.password?.message}</p>}
                                <label className="label">
                                    <Link href="#" className="label-text-alt link link-hover text-white">Forgot password?</Link>
                                </label>
                                <label className="label">
                                    <span className="label-text w-fit mx-auto text-white p-2 mb-2 border-b-2 border-red-600">What's your purpose here?</span>
                                </label>
                                <div className='flex'>
                                    <p className='text-white'>Wants to buy</p>
                                    <input {...register("role")} type="checkbox" className="toggle toggle-error" />
                                    <p className='text-white'>Wants to sell</p>
                                </div>

                            </div>
                            <div className="form-control mt-3">
                                <button type='submit' className="btn bg-red-600 text-white rounded-none hover:bg-white hover:text-black">Sign Up</button>
                            </div>
                            <p className='text-white'>Already have an account? <Link to='/user/login' className='text-red-600 font-bold hover:text-xl'>Log in</Link></p>

                            <div className="divider text-white">OR</div>

                            <div>
                                <button onClick={handleGoogleSignIn} className='flex justify-center mx-auto mb-5'>
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