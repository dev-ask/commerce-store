import React from 'react';
import CartItem from './CartItem/CartItem';
import './styles.css';
import { Link } from 'react-router-dom';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveProduct, handleEmptyCart }) => {

    const EmptyCart = () => (
        <div className="cart-page">
            <p>Looks like you have not added anything. Let's <Link to="/">start adding some!</Link></p>
        </div>
    );

    const FilledCart = () => (
        <div className="cart-page">
            <p className="cart-title">Cart Summary</p>
            <div className="cart-items-container">
                {cart.line_items.map((item) => (
                    <CartItem 
                        item={item} 
                        handleUpdateCartQty={handleUpdateCartQty} 
                        handleRemoveProduct={handleRemoveProduct}
                    />
                ))}
            </div>
            <div className="cart-info">
                <p className="cart-total">Cart Total: {cart.subtotal.formatted_with_symbol}</p>
                <div className="cart-buttons">
                    <button className="secondary" onClick={handleEmptyCart}>Remove All</button>
                    <Link to="/checkout" style={{ textDecoration: 'none' }}><button className="primary">Checkout</button></Link>
                </div>
            </div>
        </div>
    );
    
    if (!cart.line_items) return 'Fetching cart...';

    return(
        <>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </>
    )
}

export default Cart;
