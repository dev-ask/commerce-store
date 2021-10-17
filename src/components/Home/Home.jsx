import React from 'react';
import './styles.css';
import Slideshow from './Slideshow/Slideshow';
import FeaturedCollection from './FeaturedCollection/FeaturedCollection';
import FeaturedProducts from './FeaturedProducts/FeaturedProducts';

const Home = () => {
    return (
        <>
            <Slideshow />
            <FeaturedCollection />
            <FeaturedProducts />
        </>
    )
}

export default Home;
