import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const Product = ({ product, handleAddToCart }) => {

    return(
        <div className="product-container">
            <Link to={`/product/${product.id}`} style={{textDecoration: 'none'}}><img className="product-image" src={product.image.url} /></Link>
            <p className="product-name"><Link to={`/product/${product.id}`} style={{textDecoration: 'none'}}>{product.name}</Link></p>
            <p className="price">{product.price.formatted_with_symbol}</p>
            <button className="button" onClick={() => handleAddToCart(product.id, 1)}>Add to Cart</button>
        </div>
    )
}

export default Product;
