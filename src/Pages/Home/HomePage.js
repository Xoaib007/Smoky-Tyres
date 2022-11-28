import React from 'react';
import Advertisement from './Advertisement';
import Banner from './Banner';
import Banner2 from './Banner2';
import Categories from './Categories';

const HomePage = () => {
    return (
        <div>
            <Banner/>
            <Categories/>
            <Banner2/>
            <Advertisement/>
        </div>
    );
};

export default HomePage;