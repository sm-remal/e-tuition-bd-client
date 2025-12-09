import React from 'react';
import Hero from '../Hero/Hero';
import HowItWorks from '../HowItWorks/HowItWorks';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import LatestTuitions from '../LatestTuitions/LatestTuitions';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <LatestTuitions></LatestTuitions>
            <HowItWorks></HowItWorks>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;