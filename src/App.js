import React, { useState, useEffect } from 'react';
import { Home, Navigation, Products, Cart, Checkout } from './components';
import ProductDetail from './components/Products/ProductDetail/ProductDetail';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

const App = () => {
    const [ products, setProducts ] = useState([]);
    const [ cart, setCart ] = useState({});
    const [ order, setOrder ] = useState({});
    const [ errorMessage, setErrorMessage ] = useState('');

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();
        setCart(cart);
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart);
    }

    const handleRemoveProduct = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }

    const handleCaptureCheckout = async( checkoutTokenId, newOrder ) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId ,newOrder);
            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, [])

    return(
        <Router>
            <>
                <Navigation totalItems={cart.total_items} />
                <div className="main-section">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/plants">
                            <Products products={products} handleAddToCart={handleAddToCart} />
                        </Route>
                        <Route exact path="/cart">
                            <Cart 
                                cart={cart} 
                                handleUpdateCartQty={handleUpdateCartQty}
                                handleRemoveProduct={handleRemoveProduct}
                                handleEmptyCart={handleEmptyCart}
                            />
                        </Route>
                        <Route exact path="/checkout" >
                            <Checkout 
                            cart={cart} 
                            order={order}
                            setOrder={setOrder}
                            handleCaptureCheckout={handleCaptureCheckout} 
                            errorMessage={errorMessage}/>
                        </Route>
                        <Route path="/product/:id" component={ProductDetail}/>
                    </Switch>
                </div>
            </>
        </Router>
    );
}

export default App;
