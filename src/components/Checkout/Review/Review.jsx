import React from 'react';
import './styles.css';

const Review = ({ checkoutToken, shippingPrice }) => {

    return (
        <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="product-summary">
                    <div style={{flex: '3'}}></div>
                    <div style={{flex: '1', display: 'flex'}}><p style={{margin: 'auto', fontWeight:'bold'}}>Qty.</p></div>
                    <div style={{flex: '1'}}><p style={{float: 'right', fontWeight:'bold'}}>Price</p></div>
                </div>
            {checkoutToken.live.line_items.map((product) => (
                <div className="product-summary">
                    <div style={{flex: '3'}}><p>{product.name}</p></div>
                    <div style={{flex: '1', display: 'flex'}}><p style={{margin: 'auto'}}>{product.quantity}</p></div>
                    <div style={{flex: '1'}}><p style={{float: 'right'}}>{product.line_total.formatted_with_symbol}</p></div>
                </div>
    ))}
            <div className="separate"></div>
            <div className="product-summary secondary-text">
                <p>Subtotal</p>
                <p>${checkoutToken.live.subtotal.raw}</p>
            </div>
            <div className="product-summary secondary-text">
                <p>Shipping</p>
                <p>${shippingPrice - checkoutToken.live.subtotal.raw}</p>
            </div>
            <div className="payment-total" style={{fontWeight: 'bold'}}>
                <p>Order Total</p>
                <p>${shippingPrice}</p>
            </div>
        </div>
    )
}

export default Review;
