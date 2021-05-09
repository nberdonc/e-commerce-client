import React from 'react'


const ShippingInfo = ({ orderName, setOrderName, orderLastName, setOrderLastName, address, setAddress, postalcode, setPostalcode, city, setCity, country, setCountry }) => {

    let handleNameChange = (e) => {
        setOrderName(e.target.value)
        console.log(e.target.value)
    }
    let handleLastNameChange = (e) => {
        setOrderLastName(e.target.value)
        console.log(e.target.value)
    }

    let handleAddressChange = (e) => {
        setAddress(e.target.value)
        console.log(e.target.value)
    }
    let handlePostalcodeChange = (e) => {
        setPostalcode(e.target.value)
        console.log(e.target.value)
    }
    let handleCityChange = (e) => {
        setCity(e.target.value)
        console.log(e.target.value)
    }
    let handleCountryChange = (e) => {
        setCountry(e.target.value)
        console.log(e.target.value)
    }


    return (
        <div>
            <form>
                <h2>Shipping information</h2>
                <div>
                    <input onChange={handleNameChange} name="name" value={orderName} type="text" placeholder='Name*' className='sign-input' required />
                </div>
                <div>
                    <input onChange={handleLastNameChange} name="lastname" value={orderLastName} type="text" placeholder='Last Name*' className='sign-input' required />
                </div>

                <div>
                    <input onChange={handleAddressChange} name="address" value={address} type="text" placeholder='Address*' className='sign-input' required />
                </div>
                <div>
                    <input onChange={handlePostalcodeChange} name="post code" value={postalcode} type="text" placeholder='Post code*' className='sign-input' required />
                </div>
                <div>
                    <input onChange={handleCityChange} name="city" value={city} type="text" placeholder='City*' className='sign-input' required />
                </div>
                <div>
                    <input onChange={handleCountryChange} name="country" value={country} type="text" placeholder='Country*' className='sign-input' required />
                </div>
            </form>
            <div className="checkout-shipping-info">
                <h4>Delivery</h4>
                <p>3–5 working days</p>

                <h4>Exchange fee</h4>
                <p>There are no exchange fees on our side. We don't cover postage return costs.</p>

                <h4>Cancelation €4</h4>
                <p>You have the right to cancel your purchases without giving any reasons within a period of 14 calendar days after the day of deliver of the goods. The products must be returned with no sign of use.</p>

                <h4>Secure payments</h4>
                <p>We accept Visa, Mastercard and American Express. Payments are processed through Stripe (Europe, Asia, Center and North America).</p>

                <h4>Do you need help?</h4>
                <p>Find out more in our Customer service section or contact us at berdonc.nur@gmail.com</p>

            </div>
        </div>
    );
};

export default ShippingInfo