import React, { useState, useEffect } from 'react';
import './App.css';
import Nav from './Components/Nav'
import Admin from './Components/Admin'
import Cart from './Components/Cart'
import Home from './Components/Home'
import Signin from './Components/Signin'
import Register from './Components/Register'
import CheckOutPage from './Components/CheckOutPage'
import SideDrawer from './Components/SideDrawer'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function App() {

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const foundUser = JSON.parse(loggedInUser);

    if (loggedInUser) {
      setUser(foundUser);
    }
    //turn it into js
    localCart = JSON.parse(localCart);
    //load persisted cart into state if it exists
    if (localCart) {
      setCart(localCart)
    }
  }, []);

  ////NAV/BURGER NAV/////
  const [click, setClick] = useState(false)

  ////CART/PRODUCTS STATES////
  const [prodList, setProdList] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0)
  let localCart = localStorage.getItem("cart");

  ////REGISTER/SIGNIN STATES////
  const [userList, setUserList] = useState([]);
  const [toHome, setToHome] = useState(false) //to redirect to Home page
  const [user, setUser] = useState()

  ////LOG OUT////
  const clearStorage = () => {
    console.log("Logged Out")
    localStorage.clear();
    setUser()
    setCart([])
  }

  //// CHECKOUT STRIPE//////
  const stripePromise = loadStripe("pk_test_51IQE7fI4yOlGRIVQCWTcskXhffrsy4PXN2ZcfpdV7oAnAg1JNhaUUthNEDdGFaTTqJlkJglVl52m6zZgoYz0WAgF00CVwIKEMv")

  //// SHIPPING INFO///////
  const [orderName, setOrderName] = useState("")
  const [orderLastName, setOrderLastName] = useState("")
  const [address, setAddress] = useState("")
  const [postalcode, setPostalcode] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")

  ////ORDER STATES////
  const [orderList, setOrderList] = useState([]);

  return (
    <div>
        <Router>
          <header>
            {click ? <SideDrawer setClick={setClick} user={user} clearStorage={clearStorage} cart={cart} /> : null}
            <Nav user={user} cart={cart} clearStorage={clearStorage} click={click} setClick={setClick} />
          </header>
          
          <section className="App">
            <Route exact path="/" render={(props) => <Home {...props} prodList={prodList} setProdList={setProdList} cart={cart} setCart={setCart} localCart={localCart} />} />
            <Route exact path="/cart" render={(props) => <Cart {...props} setCartTotal={setCartTotal} cartTotal={cartTotal} cart={cart} setCart={setCart} localCart={localCart} />} />
            <Elements stripe={stripePromise}>
              <Route exact path="/checkout" render={(props) => <CheckOutPage {...props} setCartTotal={setCartTotal} cartTotal={cartTotal} cart={cart} setCart={setCart} localCart={localCart} orderName={orderName} setOrderName={setOrderName} orderLastName={orderLastName} setOrderLastName={setOrderLastName} address={address} setAddress={setAddress} postalcode={postalcode} setPostalcode={setPostalcode} city={city} setCity={setCity} country={country} setCountry={setCountry} orderList={orderList} setOrderList={setOrderList} />} />
            </Elements>
            <Route exact path="/signin" render={(props) => <Signin {...props} user={user} setUser={setUser} setToHome={setToHome} toHome={toHome} />} />
            <Route exact path="/register" render={(props) => <Register {...props} userList={userList} setUserList={setUserList} />} />
            <Route exact path="/admin" render={(props) => <Admin {...props} user={user} prodList={prodList} setProdList={setProdList} />} />
          </section>
          
          <footer className="footer" id="footer">
            <div className="footer-box">
              <div className="footer-content">
                <h3>CONTACT US</h3>
                <h4>Visit us:</h4>
                <p>42 Wallaby Way, Sydney</p>
                <h4>Give us a call:</h4>
                <p><i class="fas fa-phone-square"></i><a href="tel:+34686686868">+34 686686868</a></p>
                <p>Mon-Fri 8:00-17:00</p>
                <h4>E-mail us:</h4>
                <p><i class="fas fa-envelope-square"></i><a href="mailto: berdonc.nur@gmail.com">berdonc.nur@gmail.com</a></p>
              </div>
              <div className="footer-content">
                <h3>FOLLOW US</h3>
                <p><i class="fab fa-facebook-square"></i><a href="https://www.facebook.com/" target="_blank"> Facebook</a></p>
                <p><i class="fab fa-instagram-square"></i><a href="https://www.instagram.com/" target="_blank"> Instagram</a></p>
                <p><i class="fab fa-twitter-square"></i><a href="https://twitter.com/" target="_blank"> Twitter</a></p>
                <p><i class="fas fa-user-plus"></i><Link exact to="/register">Sign up
                            </Link></p>
              </div>
              <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.1824113320185!2d150.60140491520735!3d-33.75595188068768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12883f97111b4b%3A0x8d4ee0f3248ff1af!2sRock%20Wallaby%20Way%2C%20Blaxland%20NSW%202774%2C%20Australia!5e0!3m2!1ses!2ses!4v1615145181885!5m2!1ses!2ses" width="100%" height="100%" style={{ border: 0 }} allowfullscreen="" loading="lazy"></iframe>
              </div>
            </div>
            <div className="copytext-footer">
              <p>Copyright © 2020-2021 — NB.sl </p>
            </div>
          </footer>
        </Router>
    </div >

  );
}
export default App;

