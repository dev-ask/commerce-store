import React from 'react';
import './styles.css';
import siteLogo from '../../assets/site-logo.png';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ totalItems }) => {
    const location = useLocation();

    const hamburger = document.querySelector(".nav-burger");
    const navMenu = document.querySelector(".nav-menu");
    
    const mobileMenu = () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }

    const closeMenu = () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
    
    return (
        <div className="nav">
            <div className="nav-burger" onClick={mobileMenu}>
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div>
            <div className="nav-logo-link-box">
                <div className="nav-logo-center"><Link to="/" style={{ textDecoration: 'none' }}><img src={siteLogo}/></Link></div>
                <ul class="nav-menu">
                    <li class="nav-item">
                    <Link to="/plants" style={{ textDecoration: 'none' }}><a href="#" class="nav-link" onClick={closeMenu}>Plants</a></Link>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" onClick={closeMenu}>Rugs</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" onClick={closeMenu}>Lamps</a>
                    </li>
                </ul>
            </div>
            { location.pathname != '/cart' && location.pathname != '/checkout' && 
            <Link to="/cart" style={{ textDecoration: 'none' }}>
                <a className="cart-icon" href="">
                    <i className="fa icon">&#xf07a;</i>
                    <span className='badge' id='counter'>{totalItems}</span>
                </a>
            </Link> }
        </div>
    )
}

export default Navigation;
