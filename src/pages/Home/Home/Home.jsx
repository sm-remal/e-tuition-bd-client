import React from 'react';
import Hero from '../Hero/Hero';
import HowItWorks from '../HowItWorks/HowItWorks';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import LatestTuitions from '../LatestTuitions/LatestTuitions';
import LatestTutors from '../LatestTutors/LatestTutors';
import FAQ from '../FAQ/FAQ';
import StatsSection from '../StatsSection/StatsSection';
import CategoriesSection from '../CategoriesSection/CategoriesSection';
import NewsletterSection from '../NewsletterSection/NewsletterSection';

const Home = () => {
    return (
        <div>
             <title>Home | e-TuitionBD</title>
            <Hero></Hero>
            <div className='px-4 md:px-6 container-custom'>
                <LatestTuitions></LatestTuitions>
                <LatestTutors></LatestTutors>
                <StatsSection></StatsSection>
                <CategoriesSection></CategoriesSection>
                <HowItWorks></HowItWorks>
                <WhyChooseUs></WhyChooseUs>
                <FAQ></FAQ>
                <NewsletterSection></NewsletterSection>
            </div>
        </div>
    );
};

export default Home;