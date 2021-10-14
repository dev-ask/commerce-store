import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './styles.css';
import { commerce } from '../../../lib/commerce';
import { Link } from 'react-router-dom';

const AddressForm = ({ checkoutToken, next }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const countries = Object.entries(shippingCountries).map(([code, name])=> ({id: code, label: name }))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name])=> ({id: code, label: name }))
    const options = shippingOptions.map((option) => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})`}))

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, [])

    useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision]);

    const onSubmit = (data) => {
        next(data);
    }
    console.log(errors);

    return(
        <div className="address-form">
            <p>Shipping Information</p>

            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                <div className="column">
                    <input type="text" placeholder="First name" {...register("firstName", {required: true, maxLength: 80})} />
                    <input type="text" placeholder="Last name" {...register("lastName", {required: true, maxLength: 100})} />
                </div>
                <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} />
                <input type="text" placeholder="Address" {...register("address", {required: true})} />
                <div className="column"> 
                    <input type="text" placeholder="City" {...register("city", {required: true})} />
                    <input type="number" placeholder="Post Code" {...register("postalCode", {required: true})} />
                </div>
                <div className="column">
                    <div className="input-with-label">
                        <label>Country</label>
                        <select {...register("shippingCountry", { required: true })} onChange={(e) => setShippingCountry(e.target.value)}>
                            { countries.map((country) => (<option key={country.id} value={country.id}>{country.label}</option>) ) }
                        </select>
                    </div>
                    <div className="input-with-label">
                        <label>Subdivision</label>
                        <select {...register("shippingSubdivision", { required: true })} onChange={(e) => setShippingSubdivision(e.target.value)}>
                            { subdivisions.map((subdivision) => (<option key={subdivision.id} value={subdivision.id}>{subdivision.label}</option>) ) }
                        </select>
                    </div>
                </div>
                <label>Delivery Method</label>
                <select {...register("shippingOption", { required: true })} onChange={(e) => setShippingOption(e.target.value)}>
                { options.map((option) => (<option key={option.id} value={option.id}>{option.label}</option>) ) }
                </select>
                <div className="form-btn-group" style={{justifyContent: 'space-evenly'}}>
                    <Link to="/cart" style={{textDecoration: 'none'}}><button className="secondary">Go Back</button></Link>
                    <input type="submit" className="primary"/>
                </div>
            </form>
        </div>
    )
}

export default AddressForm;
