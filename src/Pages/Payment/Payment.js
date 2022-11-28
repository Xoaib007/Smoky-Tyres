import React from 'react';
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm';
import { useLoaderData } from 'react-router-dom';


const stripePromise = loadStripe(process.env.REACT_APP_Stripe_pk);

console.log(stripePromise)

const Payment = () => {
    const booking= useLoaderData();

    return (
        <div className='min-h-screen w-1/2 mx-auto mt-20'>
            <Elements stripe={stripePromise}>
                <CheckoutForm
                    booking={booking}
                />
            </Elements>
        </div>
    );
};

export default Payment;