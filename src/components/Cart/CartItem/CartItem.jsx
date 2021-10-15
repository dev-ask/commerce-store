import React from 'react';
import './styles.css';

const CartItem = ({ item, handleUpdateCartQty, handleRemoveProduct }) => {

    return (
        <div className="product-container">
            <img src={item.image.url} className="product-image" />
            <p className="product-name">{item.name}</p>
            <p className="price">{item.line_total.formatted_with_symbol}</p>
            <div className="pd-qty-selector">
                <button onClick={()=>handleUpdateCartQty(item.id, item.quantity - 1)}>-</button>
                <div><p>{item.quantity}</p></div>
                <button onClick={()=>handleUpdateCartQty(item.id, item.quantity + 1)}>+</button>
            </div>
            <button className="cart-remove-btn" onClick={()=>handleRemoveProduct(item.id)}>Remove</button>
        </div>
    )
}

export default CartItem;
