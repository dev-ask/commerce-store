import React from 'react';
import './styles.css';
import logo from '../../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ totalItems }) => {
    const location = useLocation();

    return (
        <div className="navigation-bar">
            <Link to="/" style={{ textDecoration: 'none' }}>
                <a className="logo" href="">
                    <img className="logo-icon" src={logo}/>
                    <p className="shop-name">Sakura Shop</p>
                </a>
            </Link>
            { location.pathname === '/' && 
            <Link to="/cart" style={{ textDecoration: 'none' }}>
                <a className="cart-icon" href="">
                    <i className="fa icon">&#xf07a;</i>
                    <span className='badge' id='counter'>{totalItems}</span>
                </a>
            </Link> }
        </div>
    )
}

export default Navbar;
