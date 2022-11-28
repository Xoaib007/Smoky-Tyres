import React from 'react';
import toast from 'react-hot-toast';

const TestDriveModal = ({ modal, setModal, currentUser }) => {

    const handleTestDriveSubmit= (e)=>{
        e.preventDefault();
        const form= e.target;
        const buyerPhone= form.phone.value;
        const city= form.city.value;
        const buyer= currentUser.name;
        const buyerEmail= currentUser.email;
        const car= modal._id;
        const carName = modal.year+' '+modal.brand + ' '+ modal.model;
        const carPhoto= modal.photo;
        const seller= modal.seller;
        const sellerEmail= modal.sellerEmail;
        const date= form.date.value;
        const time= form.time.value;

        const testDriveBooking ={
            testDriveFor: car,
            testDriveFor2: carName,
            testDriveFor3: carPhoto,
            seller,
            sellerEmail,
            buyer,
            buyerEmail,
            buyerPhone,
            requestedDate: date,
            requestedTime: time,
            requestedLocation: city,
            isPaid: false,
        }

        fetch('https://smoky-tyres-server.vercel.app/testdrivebooking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(testDriveBooking)
        })
            .then(res => res.json())
            .then(data=>{
                toast.success('Test drive booked successfully!! Visit dashboard to pay and confirm the booking.')
                setModal(null)})
    }
    return (
        <div>
            {/* Form Modal */}
            <input type="checkbox" id="TestDriveModal" className="modal-toggle" />
            <div className="modal">
                <form onSubmit={handleTestDriveSubmit} className="modal-box relative rounded-none">
                    <label htmlFor='TestDriveModal' className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <input type="text" value={currentUser.name} className="input input-bordered w-full my-2" disabled />
                    <input type="text" value={currentUser.email} className="input input-bordered w-full my-2" disabled />
                    <input type="text" value={modal.year+' '+modal.brand + ' '+ modal.model} className="input input-bordered w-full my-2" disabled />

                    <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full my-2" required />

                    <input name='city' type="text" placeholder="City Which is suitable for you to meet" className="input input-bordered w-full my-2" required />

                    <div className='flex'>
                        <input name='date' type="date" placeholder="Date" className="input input-bordered w-4/6 my-2 mr-4" required />

                        <input name='time' type="time" placeholder="Date" className="input input-bordered w-2/6 my-2" required />
                    </div>
                    
                    <input type='submit' htmlFor='TestDriveModal' className="btn bg-red-600 rounded-none w-full mt-5" />
                </form>
            </div>
        </div>
    );
};

export default TestDriveModal;