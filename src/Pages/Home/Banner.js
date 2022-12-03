import React from 'react';

const Banner = () => {
    return (
        <div className='bg1 h-screen'>
            <div className=' relative top-96'>
                <p className='lg:text-5xl text-2xl font-bold text-white outline py-5 pl-10 text-left'>We are the best when it comes to <br />Exotic Cars.<br/>Sell your luxury car in 29 minutes.</p>
                <button className='btn rounded-none mt-16 w-1/3 bg-red-600  hover:bg-white hover:text-red-600 hover:border-white tracking-widest lg:relative lg:right-[470px]'>Browse Collection</button>
            </div>

        </div>
    );
};

export default Banner;