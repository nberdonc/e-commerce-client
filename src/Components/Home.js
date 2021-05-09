import React from 'react'
import Products from './Products'

const Home = ({ prodList, setProdList, cart, setCart, localCart }) => {

    return (
        <div id='home'>
            <Products prodList={prodList} setProdList={setProdList} cart={cart} setCart={setCart} localCart={localCart} />
        </div>
    )
}

export default Home
