import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import toast from 'react-hot-toast';

const CheckoutForm = ({booking}) => {
    const stripe = useStripe();
    const elements = useElements();

    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const [cardError, setCardError] = useState();
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("https://smoky-tyres-server.vercel.app/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: 120 }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)

        } else {
            setCardError('');
        }
            setSuccess('');
            setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: booking.buyer,
                        email: booking.buyerEmail,
                    },
                },
            },
        );

        if(confirmError){
            toast.error(confirmError.message)
            setCardError(confirmError.message)
            return;
        }
        if(paymentIntent.status === "succeeded"){
            
            const payment={
                price: booking.price,
                transactionId: paymentIntent.id,
                productBy: booking.seller,
                product: booking.testDriveFor2,
                payedBy: booking.buyerEmail,
                bookingId: booking._id
            }

            fetch('https://smoky-tyres-server.vercel.app/payment',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
            .then(res=> res.json())
            .then(data=>{
                if(data.insertedId){
                    toast.success('Transaction has been successfully done.')
                    setSuccess('Transaction has been successfully done.');
                    setTransactionId(paymentIntent.id);
        
                }
            })
        }
        
        setProcessing(false)
        console.log('paymentIntent', paymentIntent)


    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='w-96 btn bg-red-600 text-xl font-bold hover:border-red-600 hover:bg-white hover:text-red-600 rounded-none mt-10' type="submit" disabled={!stripe || !clientSecret || processing}>Pay</button>
            </form>
            <p className='mt-5 text-left font-bold text-red-600'>{cardError}</p>
            {
                success && <div>
                    <p className='mt-5 text-left font-bold text-green-600'>{success}</p>
                    <p className='text-left'>your Transaction ID: <span className='test-xl font-bold'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;