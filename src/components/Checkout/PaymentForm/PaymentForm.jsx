import React, {useEffect, useState} from 'react';
import Review from '../Review/Review';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './styles.css';
import {commerce} from '../../../lib/commerce';

const PaymentForm = ({ checkoutToken, backStep, shippingData, handleCaptureCheckout, nextStep, order, setOrder }) => {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const [ shippingPrice, setShippingPrice ] = useState('');

    useEffect(()=>{
        commerce.checkout.checkShippingOption(checkoutToken.id, {
            shipping_option_id: shippingData.shippingOption,
            country: shippingData.shippingCountry,
            region: shippingData.shippingSubdivision,        
        }).then((response) => setShippingPrice(checkoutToken.live.subtotal.raw + response.price.raw));
    }, []);

    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if(!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({type: 'card', card: cardElement});

        if(error) {
            console.log(error)
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: {firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email},
                shipping:  {
                    name: 'Primary',
                    street: shippingData.address,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.postalCode,
                    country: shippingData.shippingCountry,
                },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }
            if (order.customer) { setOrder('');} // delete previous order if it exist 
            handleCaptureCheckout(checkoutToken.id, orderData);
            nextStep();
        }
    }

    return(
        <div className="pf-box">
            <Review checkoutToken={checkoutToken} shippingPrice={shippingPrice}/>
            <div className="divider"></div>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements, stripe}) => (
                        <form onSubmit={(e)=> handleSubmit(e, elements, stripe)} className="payment-card-group">
                            <CardElement />
                            <div className="form-btn-group" style={{justifyContent: 'flex-end'}}>
                                <button className="secondary" onClick={backStep}>Go Back</button>
                                <button className="primary" type="submit" disabled={!stripe}>Pay ${shippingPrice}</button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </div>
    )
}

export default PaymentForm;
