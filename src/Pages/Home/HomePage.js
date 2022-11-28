import React from 'react';
import Advertisement from './Advertisement';
import Banner from './Banner';
import Categories from './Categories';

const HomePage = () => {
    return (
        <div>
            <Banner/>
            <Categories/>
            <Advertisement/>
        </div>
    );
};

export default HomePage;