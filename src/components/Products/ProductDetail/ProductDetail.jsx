import React, { useState, useEffect } from 'react';
import { commerce } from '../../../lib/commerce';
import './styles.css';

const ProductDetail = ({ match }) => {
    const [product, setProduct] = useState({assets: Array, name: String, image: {url: String}, price: {formatted_with_symbol: String}, description: String});
    const [ loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchProductDetails = async (productId) => {
            const item = await commerce.products.retrieve(productId);
            setProduct(item);
            setLoading(false);
        }
        fetchProductDetails(match.params.id);
    }, []);

    return (
        <> { loading === false ?
            <div className="pd-box"> 
                <div className="pd-img">
                    {product.assets.map(image => (<img src={image.url}/>))}
                </div>
                <div className="pd-details">
                    <div className="pd-info">
                        <p className="pd-title">{product.name}</p>
                        <p className="pd-price">{product.price.formatted_with_symbol}</p>
                    </div>
                    <div className="pd-description">
                        <p dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>
                    <div className="pd-qty-selector">
                        <button>-</button>
                        <div><p>1</p></div>
                        <button>+</button>
                    </div>
                    <button className="pd-add-btn">Add to Cart</button>
                    <div className="pd-social-buttons">
                        <a target="_blank" href="//www.facebook.com">
                            <img width="24" height="24" src="https://cdn-icons-png.flaticon.com/512/123/123717.png"/>
                        </a>
                        <a target="_blank" href="//www.twitter.com">
                            <img width="24" height="24" src="https://cdn-icons-png.flaticon.com/512/733/733635.png"/>
                        </a>
                        <a target="_blank" href="//www.pinterest.com">
                            <img width="24" height="24" src="https://cdn-icons-png.flaticon.com/512/2111/2111601.png"/>
                        </a>
                        <a target="_blank" href="//www.gmail.com">
                            <img width="24" height="24" src="https://cdn-icons.flaticon.com/png/512/542/premium/542689.png?token=exp=1634198679~hmac=aa448c113b3a22a8d5ac85030b782edd"/>
                        </a>
                    </div>
                </div>
            </div> : <div className="loader">Loading...</div>}
        </>
    )
}

export default ProductDetail;
