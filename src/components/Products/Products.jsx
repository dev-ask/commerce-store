import React from 'react';
import Product from './Product/Product';
import './styles.css';

const Products = ({ products, handleAddToCart }) => {
    return(
        <div className="products-container">
            {products.map(product => (<Product product={product} key={product.id} handleAddToCart={handleAddToCart} />))}  
        </div>
    )
}

export default Products;
