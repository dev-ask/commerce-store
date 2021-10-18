import React, { useEffect } from 'react';
import './styles.css';
import plants from '../../../assets/ss-plants.jpg';
import rugs from '../../../assets/ss-rugs.jpg';
import lamps from '../../../assets/ss-lamps.jpg';

const Slideshow = () => {
    let slideIndex = 1;

    const handleClick = (n) => {
        showSlides(slideIndex += n);
    }

    const showSlides = (n) => {
        const slides = document.getElementsByClassName("toggle-view");

        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}

        var arr = [].slice.call(slides);
        arr.map((item)=> item.style.display = "none");
        arr[slideIndex-1].style.display = "block";
    }

    useEffect(()=>{
        showSlides(slideIndex);
    }, []);

    return (
        <div className="ss-box">
            <div className="toggle-view fade">
                <div className="slide">
                    <div className="ss-info">
                        <p className="ss-title">Artificial Plants</p>
                        <p className="ss-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat lorem urna, id sodales massa convallis in. Nullam tincidunt dictum metus, ut gravida lectus commodo nec.</p>
                        <a className="ss-link">Shop Now <i class="fas fa-angle-right"></i></a>
                    </div>
                    <div className="ss-image">
                        <img src={plants} />
                    </div>
                </div>
            </div>
            <div className="toggle-view fade">
                <div className="box2">  
                    <div className="ss-image">
                        <img src={rugs} />
                    </div>
                    <div className="box2-info">
                        <p className="box2-title">Seasonal Rugs</p>
                        <p className="ss-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat lorem urna, id sodales massa convallis in. Nullam tincidunt dictum metus, ut gravida lectus commodo nec.</p>
                        <a className="ss-link">Shop Now <i class="fas fa-angle-right"></i></a>
                    </div>
                </div>
            </div>
            <div className="toggle-view fade">
                <div className="slide">
                    <div className="ss-info">
                        <p className="ss-title">New Lamps Collection</p>
                        <p className="ss-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat lorem urna, id sodales massa convallis in. Nullam tincidunt dictum metus, ut gravida lectus commodo nec.</p>
                        <a className="ss-link">Shop Now <i class="fas fa-angle-right"></i></a>
                    </div>
                    <div className="ss-image">
                        <img src={lamps} />
                    </div>
                </div>
            </div>

            <div className="ss-btn-group">
                <button onClick={() => handleClick(-1)} className="ss-btn previous"><i class="fas fa-angle-left xxl"></i></button>
                <button onClick={() => handleClick(1)} className="ss-btn next" id="next"><i class="fas fa-angle-right xxl"></i></button>
            </div>
        </div>
    )
}

export default Slideshow;