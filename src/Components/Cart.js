import React, { useState, useEffect } from 'react'
//import banana from './Pictures/banana.jpg'
import { Link } from 'react-router-dom'

const Cart = ({ cart, setCart, cartTotal, setCartTotal }) => {

    const [disabledBtn, setDisabledBtn] = useState(false)
    const [emptyStockMsg, setEmptyStockMsg] = useState("")

    const disableBtn = () => {
        if (cart.length < 1) {
            setDisabledBtn(true)
        }
    }


    useEffect(() => {
        disableBtn()
        calculateTotal();
        let cartTotalString = JSON.stringify(cartTotal)
        localStorage.setItem('cart', cartTotalString)
        let cartString = JSON.stringify(cart)
        localStorage.setItem('cart', cartString)
    }, [cart])

    ////////////////////////////// CLEAR ALL CART  //////////////////////////////

    const clearCart = () => {
        setCart([])
        console.log(cart)

    }

    ////////////////////////////// CLEAR PRODUCT CART  //////////////////////////////

    const clearCartItem = (itemID) => {
        let cartFiltered = cart.filter(item => item._id !== itemID);
        setCart(cartFiltered)
    }

    ////////////////////////////// REDUCE FROM CART  //////////////////////////////

    const reduceCounter = (itemID) => {
        let cartcopy = [...cart]
        //find if item exists, just in case
        let existentItem = cartcopy.find(item => item._id === itemID);
        //if it doesnt exist simply return
        if (!existentItem) return
        //continue and update quantity
        existentItem.quantity--;
        //validate result
        if (existentItem.quantity <= 0) {
            //remove item  by filtering it from cart array
            return clearCartItem(itemID)
        }
        //again, update state and localState
        setCart(cartcopy);
    }

    ////////////////////////////// INCREASE CART  //////////////////////////////

    const increaseCounter = (itemID) => {
        let cartcopy = [...cart]
        //find if item exists, just in case
        let existentItem = cartcopy.find(item => item._id === itemID);
        console.log("existentItem", existentItem)
        //if it doesnt exist simply return
        if (!existentItem) return
        //continue and update quantity
        if (existentItem.stock > existentItem.quantity) {
            existentItem.quantity++;
        }
        else {
            setEmptyStockMsg("Not enough inventory")
            setTimeout(() => {
                setEmptyStockMsg("");
            }, 1000);
        }


        //again, update state and localState
        setCart(cartcopy);
    }

    ////////////////////////////// CALCULATE TOTAL  //////////////////////////////

    const calculateTotal = () => {
        const cartCalculation = cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        setCartTotal(cartCalculation)
    }

    return (
        <div className='cart'>
            <form className="form">
                <div>
                    <div className="cart-box">
                        <p>Items added to cart</p>
                        <p onClick={() => clearCart()}>x</p>
                    </div>
                    <div className="cart-box">
                        <p>Items</p>
                        <p>Subtotal</p>
                    </div>
                    {cartTotal > 1 ? <p>FREE SHIPPING</p> : null}
                </div>
                <hr />
                {cart.map((item, idx) => (
                    <div key={idx} className="cart-box">
                        <img className="cart-img" src={item.image} alt={item.name} />
                        <div>
                            <div className="cart-box">
                                <p>{item.name}</p>
                                <p name="-" onClick={() => clearCartItem(item._id)}>x</p>
                            </div>
                            <p>{item.price}€</p>
                            <div className="cart-box">
                                <div className="cart-box">
                                    <p name="-" onClick={() => reduceCounter(item._id)}>-</p>
                                    <p>{item.quantity}</p>
                                    <p name="+" onClick={() => increaseCounter(item._id)}>+</p>
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
                <p className="red">{emptyStockMsg}</p>
                <Link exact to={"/checkout"}><button className='checkout-btn' disabled={disabledBtn}>Checkout</button></Link>
                <div className='form-text'>
                    <p>Not ready yet?</p>
                    <p><Link exact to={"/"}>
                        Continiue shopping
                       </Link></p>
                </div>
            </form>
        </div >
    )
}

export default Cart
