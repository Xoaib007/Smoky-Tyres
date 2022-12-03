import React from 'react';

const Banner2 = () => {
    return (
        <div className='min-h-screen lg:display hidden'>
            <div className='lg:flex pt-32'>
                <div className='w-1/2 pt-10 pl-20'>
                    <p className='text-5xl font-bold'>Why us?</p>
                    <div className='grid grid-cols-3 gap-20 lg:gap-10 mt-20'>
                        <div>
                            <img className='w-fit mx-auto' src='https://cdn.bigboytoyz.com/new-version/assets/images/accidentalhistory-icon.png' alt=''/>
                            <p>NON ACCIDENTAL GUARANTEED</p>
                        </div>
                        <div>
                            <img className='w-fit mx-auto' src='https://cdn.bigboytoyz.com/new-version/assets/images/limitedperiodwarranty-icon.png' alt=''/>
                            <p>BEST DEAL ANYONE CAN OFER</p>
                        </div>
                        <div>
                            <img className='w-fit mx-auto' src='https://cdn.bigboytoyz.com/new-version/assets/images/hasslefreebuyprocess-icon.png' alt=''/>
                            <p>TEST DRIVE FOR ONLY $120</p>
                        </div>
                        <div>
                            <img className='w-fit mx-auto' src='https://cdn.bigboytoyz.com/new-version/assets/images/buybackagreement-handshake-icon.png' alt=''/>
                            <p>SELL YOUR CAR IN 32 MINUTES</p>
                        </div>
                        <div>
                            <img className='w-fit mx-auto' src='https://cdn.bigboytoyz.com/new-version/assets/images/serviceinsurance-historycheck-icon.png' alt=''/>
                            <p>SERVICE & INSURANCE HISTORY CHECK</p>
                        </div>
                        <div>
                            <img className='w-fit mx-auto' src='https://cdn.bigboytoyz.com/new-version/assets/images/clientsconfidentiality-icon.png' alt=''/>
                            <p>CLIENT'S CONFIDENTIALITY</p>
                        </div>
                    </div>
                </div>
                <div className='w-1/2'>
                    <img className='w-9/12 ml-32 rounded-3xl' src='https://i.ibb.co/frH7hfY/Screenshot-2022-11-28-132802.png' alt=''/>
                </div>
            </div>
        </div>
    );
};

export default Banner2;