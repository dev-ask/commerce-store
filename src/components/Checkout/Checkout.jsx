import React, { useState, useEffect } from 'react';
import './styles.css';
import AddressForm from './AddressForm/AddressForm';
import PaymentForm from './PaymentForm/PaymentForm';
import { commerce } from '../../lib/commerce';
import { Link } from 'react-router-dom';

const Checkout = ({ cart, order, handleCaptureCheckout, errorMessage, setOrder }) => {
    const [ activeStep, setActiveStep] = useState(0);
    const [ shippingData, setShippingData ] = useState({});
    const [ checkoutToken, setCheckoutToken ] = useState(null);
    const steps = [ 'Shipping Details', 'Payment Details' ];

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                setCheckoutToken(token);
            } catch (error) {
                console.log(error);
            }
        }
        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep((prevAcitiveState)=> prevAcitiveState + 1);
    const backStep = () => setActiveStep((prevAcitiveState)=> prevAcitiveState - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    let Confirmation = () => order.customer ? (
        <div className="cart-page">
            <h2>Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</h2>
            <div className="divider"></div>
            <p>Order reference: {order.customer_reference}</p>
            <Link to="/" style={{textDecoration: 'none'}}><button>Back to Home</button></Link>
        </div>   
    ) : (
        <div>
            <h1>Loading...</h1>
        </div>
    );
    
    if(errorMessage) {
        <>
            <h1>{errorMessage}</h1>
            <Link to="/" style={{textDecoration: 'none'}}><button>Back to Home</button></Link>
        </>
    }

    const Form = () => activeStep === 0 ? 
        <AddressForm checkoutToken={checkoutToken} next={next}/> : 
        <PaymentForm 
            checkoutToken={checkoutToken} 
            order = {order}
            setOrder={setOrder}
            backStep={backStep} 
            nextStep={nextStep}
            shippingData={shippingData}
            handleCaptureCheckout={handleCaptureCheckout}/> 

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            { activeStep === steps.length ? <Confirmation order={order} errorMessage={errorMessage}/> : checkoutToken && <Form />}
        </div>
    )
}

export default Checkout;
