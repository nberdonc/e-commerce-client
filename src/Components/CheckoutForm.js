import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { updateStockProduct, resetStockProductdueCardFailure, addOrder, displayOrders } from '../AxiosLink'
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js"

const CheckoutForm = ({ cart, cartTotal, setCartTotal, setCart, localCart, orderName, setOrderName, orderLastName, setOrderLastName, address, setAddress, postalcode, setPostalcode, city, setCity, country, setCountry, setOrderList }) => {


    ////////////////////////////// TO DISPLAY ALL USERS /////////////////////////////

    useEffect(async () => {
        let orderList = await displayOrders()
        setOrderList(orderList)
    }, [])


    const [email, setEmail] = useState("")
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [responseMessage, setResponseMessage] = useState("")
    const [orderNumber, setOrderNumber] = useState(1)
    const [orderStatus, setOrderStatus] = useState("")
    const stripe = useStripe();
    const elements = useElements();

    let handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    let handleCardInputChange = (e) => {
        if (e.complete && cart.length > 0) {
            setDisabledBtn(false)
        }
        else {
            setDisabledBtn(true)
        }
    }

    let cartListBeforePay = []

    const updateStock = async (cart) => {
        cart.map((ele) => {
            cartListBeforePay.push({ id: ele._id, quantity: ele.quantity })
        })
        console.log("cartListBeforePay", cartListBeforePay)
        return updateStockProduct(cartListBeforePay)
    }

    const resetStockdueCardFailure = () => {
        console.log("cartListBeforePay", cartListBeforePay)
        return resetStockProductdueCardFailure(cartListBeforePay)
    }

    let orderID = ""

    let addOneOrder = async () => {
        let response = await addOrder(email, orderName, orderLastName, address, postalcode, city, country, cartListBeforePay)
        console.log("order ID", response._id)
        orderID = response._id
        //to clear input
        setOrderName("")
        setOrderLastName("")
        setAddress("")
        setPostalcode("")
        setCity("")
        setCountry("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabledBtn(true)
        const response = await updateStock(cart)
        if (response.statusText === "OK") {
            console.log("success items reserved")
        }
        else {
            localStorage.removeItem('cart');
            setDisabledBtn(false)
            setOrderStatus("red")
            setResponseMessage("SOMETHING WENT WRONG; PLEASE TRY AGAIN LATER.")
            setCart([])
            return
        }

        const cardElement = elements.getElement(CardElement)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        if (!error) {
            const { id } = paymentMethod;

            try {
                let url = "http://localhost:3000/checkout"
                let promise = axios.post(url, {
                    id,
                    amount: cartTotal,
                    email: email
                });
                const response = await promise
                console.log(response)
                if (response.data.confirm === "success") {
                    await addOneOrder()
                    setOrderNumber(orderID)
                    setOrderStatus("green")
                    setEmail("")
                    localStorage.removeItem('cart');
                    cardElement.clear()
                    setCart([])
                    setResponseMessage(`YOUR ORDER #${orderID} HAS BEEN PROCESSED!`)
                    console.log(orderNumber)

                } else {
                    resetStockdueCardFailure()
                    localStorage.removeItem('cart');
                    setDisabledBtn(false)
                    console.log(error)
                    setOrderStatus("red")
                    setResponseMessage("SOMETHING WENT WRONG! PLEASE TRY AGAIN LATER.")
                    setCart([])

                }
                console.log("response", response)
            }
            catch (error) {
                resetStockdueCardFailure()
                localStorage.removeItem('cart');
                setDisabledBtn(false)
                console.log(error)
                setOrderStatus("red")
                setResponseMessage("SOMETHING WENT WRONG! PLEASE TRY AGAIN LATER.")
                setCart([])

            }
        }
    };

    const calculateTotal = () => {
        const cartCalculation = cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        setCartTotal(cartCalculation)
    }

    useEffect(() => {
        calculateTotal();
    }, [cart]);

    return (
        <div >
            <div >
                <h2>Items in bag</h2>
            </div>
            <div className="checkout-cart">
                <form onSubmit={handleSubmit} >

                    <hr className="hr-line" />
                    {cart.map((item, idx) => (
                        <div key={idx} className="cart-box">
                            <img className="cart-img" src={item.image} alt={item.name} />
                            <div>
                                <div className="cart-box">
                                    <p>{item.name}</p>
                                </div>
                                <p>{item.price}€</p>
                                <div className="cart-box">
                                    <div className="cart-box">
                                        <p>Quantity</p>
                                        <p>{item.quantity}</p>
                                    </div>
                                    <p className="cart-stotal">{item.quantity * item.price}€</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="cart-box">
                        <p>Total</p>
                        <p>{cartTotal}€</p>
                    </div>
                    <hr />
                    <div>
                        <input onChange={handleEmailChange} name="email" value={email} type="email" placeholder='e-mail*' className='checkout-btn' required />
                    </div>
                    <CardElement onChange={handleCardInputChange} ClassName='checkout-btn' />
                    <button className='checkout-btn' type="sumbit" disabled={disabledBtn}>
                        Pay
                        </button>
                    <div className='form-text'>
                        <p>Not sure yet?
                        <Link exact to="/cart">
                                , Go back to cart
                        </Link></p>
                    </div>
                </form>
                <h3 className={orderStatus}>{responseMessage}</h3>
            </div>
        </div>
    );
};

export default CheckoutForm

/* maybe to place in cart on top of <hr>
    <div>
        {cartTotal > 49 ? <p>FREE SHIPPING</p> : null}
    </div>
    */

