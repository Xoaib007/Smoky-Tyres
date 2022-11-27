import React from 'react';

const TestDriveModal = ({ modal, setModal, currentUser }) => {
    return (
        <div>
            {/* Form Modal */}
            <input type="checkbox" id="TestDriveModal" className="modal-toggle" />
            <div className="modal">
                <form className="modal-box relative rounded-none">
                    <label htmlFor='TestDriveModal' className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <input type="text" value={currentUser.name} className="input input-bordered w-full my-2" disabled />
                    <input type="text" value={currentUser.email} className="input input-bordered w-full my-2" disabled />
                    <input type="text" value={modal.year+' '+modal.brand + ' '+ modal.model} className="input input-bordered w-full my-2" disabled />
                    <input name='phone' type="text" placeholder="Phone Number" className="input input-bordered w-full my-2" required />
                    <input name='city' type="text" placeholder="City Which is suitable for you to meet" className="input input-bordered w-full my-2" required />
                    <input type='submit' htmlFor='TestDriveModal' className="btn bg-red-600 rounded-none w-full mt-5" />
                </form>
            </div>
        </div>
    );
};

export default TestDriveModal;