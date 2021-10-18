import React from 'react';
import './styles.css';
import featurePlants from '../../../assets/fp-plants.jpg';
import featureRugs from '../../../assets/fp-rugs.jpg';
import featureLamps from '../../../assets/fp-lamps.jpg';

const FeaturedProducts = () => {
    return (
        <div className="fp-container">
            <h3 className="fp-header">FEATURED COLLECTION</h3>
            <div className="fp-box">
                <div className="fp-info pad-l-r">
                    <p className="fp-title sm-title">Browse Plants</p>
                    <p className="fp-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat lorem urna, id sodales massa convallis in. Nullam tincidunt dictum metus, ut gravida lectus commodo nec.</p>
                    <a className="fp-link">Shop Now <i class="fas fa-angle-right"></i></a>
                </div>
                <div className="fp-image">
                    <img src={featurePlants} />
                </div>
            </div>
            <div className="box2">
                <div className="fp-image">
                    <img src={featureRugs} />
                </div>
                <div className="box2-info pad-l-r">
                    <p className="box2-title sm-title">Browse Rugs</p>
                    <p className="fp-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat lorem urna, id sodales massa convallis in. Nullam tincidunt dictum metus, ut gravida lectus commodo nec.</p>
                    <a className="fp-link">Shop Now <i class="fas fa-angle-right"></i></a>
                </div>
            </div>
            <div className="fp-box">
                <div className="fp-info pad-l-r">
                    <p className="fp-title sm-title">Browse Lamps</p>
                    <p className="fp-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat lorem urna, id sodales massa convallis in. Nullam tincidunt dictum metus, ut gravida lectus commodo nec.</p>
                    <a className="fp-link">Shop Now <i class="fas fa-angle-right"></i></a>
                </div>
                <div className="fp-image">
                    <img src={featureLamps} />
                </div>
            </div>
        </div>
    )
}

export default FeaturedProducts;
