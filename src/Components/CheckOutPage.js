import React from 'react'
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from './CheckoutForm'
import ShippingInfo from './ShippingInfo'

const stripePromise = loadStripe("pk_test_51IQE7fI4yOlGRIVQCWTcskXhffrsy4PXN2ZcfpdV7oAnAg1JNhaUUthNEDdGFaTTqJlkJglVl52m6zZgoYz0WAgF00CVwIKEMv")

const CheckOutPage = ({ cart, cartTotal, setCartTotal, localCart, setCart, orderName, setOrderName, orderLastName, setOrderLastName, address, setAddress, postalcode, setPostalcode, city, setCity, country, setCountry, orderList, setOrderList }) => {

    return (
        <div className='checkout-form'>
            <ShippingInfo orderName={orderName} setOrderName={setOrderName} orderLastName={orderLastName} setOrderLastName={setOrderLastName} address={address} setAddress={setAddress} postalcode={postalcode} setPostalcode={setPostalcode} city={city} setCity={setCity} country={country} setCountry={setCountry} />
            <Elements stripe={stripePromise}>
                <CheckoutForm setCartTotal={setCartTotal} cartTotal={cartTotal} cart={cart} setCart={setCart} localCart={localCart} orderName={orderName} setOrderName={setOrderName} orderLastName={orderLastName} setOrderLastName={setOrderLastName} address={address} setAddress={setAddress} postalcode={postalcode} setPostalcode={setPostalcode} city={city} setCity={setCity} country={country} setCountry={setCountry} orderList={orderList} setOrderList={setOrderList} />
            </Elements>
        </div>
    );
};

export default CheckOutPage

