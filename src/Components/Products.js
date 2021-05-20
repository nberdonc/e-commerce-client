import React, { useEffect } from 'react'
import { displayProducts } from '../AxiosLink'

const Products = ({ prodList, setProdList, cart, setCart, localCart }) => {

    ////////////////////////////// DISPLAY PRODUCTS  //////////////////////////////
    useEffect(async () => {
        let prodListDB = await displayProducts()
        console.log(prodListDB)
        setProdList(prodListDB)

    }, [])

    useEffect(async () => {
        console.log("AASDASD", prodList)
    }, prodList)

    ////////////////////////////// ADD TO CART  //////////////////////////////

    const addToCart = (item) => {
        cart = [...cart];
        //assuming we have an ID field in our item
        let ID = item._id;
        //look for item in cart array
        let existingItem = cart.find(cartItem => cartItem._id == ID);
        //if item already exists
        if (existingItem && existingItem.stock > existingItem.quantity) {
            existingItem.quantity++
        } else if (!existingItem) { //if item doesn't exist, simply add it
            cart.push(item)
        }
        //update app state
        setCart(cart)
        //make cart a string and store in local space
        let stringCart = JSON.stringify(cart);
        localStorage.setItem("cart", stringCart)
        console.log(cart)
        setCart(cart)

    };
    // to prevent local state to be lost if user refreshes the page
    useEffect(() => {

        //load persisted cart into state if it exists
        if (localCart) {
            //turn it into js
            localCart = JSON.parse(localCart);
            setCart(localCart)
        }
    }, []) //the empty array ensures useEffect only runs once


    ////////////////////////////// DISPLAY PRODUCTS  //////////////////////////////

    let renderProducts = (arr) => (
        arr.map((ele, idx) => {
            console.log(arr)
            return ele.stock > 0 ?
                <div key={idx}>
                    <div class="box">
                        <img className='prod-img' src={ele.image} alt={ele.name} />
                        <button onClick={() => addToCart(ele)} className='btn'>+</button>
                    </div>
                    <div className='prod-bottom'>
                        <p>{ele.name}</p>
                        <p>Price: {ele.price}€</p>
                    </div>
                </div> : null
        })
    )

    let renderBestSales = (arr) => (
        arr.map((ele, idx) => {
            return ele.onSale === true && ele.stock > 0 ?
                <div key={idx}>
                    <div class="box">
                        <img className='prod-img' src={ele.image} alt={ele.name} />
                        <button onClick={() => addToCart(ele)} className='btn'>+</button>
                    </div>
                    <div className='prod-bottom'>
                        <p>{ele.name}</p>
                        <p>Price: {ele.price}€</p>
                    </div>

                </div> : null
        })
    )

    return (
        <div>
            <div id="products" className='products'>
                <h1> ALL PRODUCTS</h1>
                <hr className="hr-admin"></hr>
                <p className="prod-box">{renderProducts(prodList)}</p>
            </div>
            <div id="products" className='products'>
                <h1> BEST SALES</h1>
                <hr className="hr-admin"></hr>
                <p className="prod-box">{renderBestSales(prodList)}</p>
            </div>

        </div>
    )
}

export default Products