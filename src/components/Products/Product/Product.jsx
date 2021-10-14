import React from 'react';
import './styles.css';

const Product = ({ product, handleAddToCart }) => {

    return(
        <div className="product-container">
            <img className="product-image" src={product.image.url} />
            <p className="product-name">{product.name}</p>
            <p className="price">{product.price.formatted_with_symbol}</p>
            <button className="button" onClick={() => handleAddToCart(product.id, 1)}>Add to Cart</button>
        </div>
    )
}

export default Product;
