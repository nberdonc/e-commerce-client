import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import logo from '../Components/Pictures/logo.JPG';

const Nav = ({ cart, clearStorage, user, click, setClick }) => {

    const handleClick = () => {
        setClick(!click)
    }

    const cartTotal = cart.reduce((total, item) => {
        return total + (item.quantity);
    }, 0)

    return (
        <nav className="navbar">
            <NavLink className="navlink"
                exact to={"/"}
                activeStyle={{
                    fontWeight: "bold",
                    color: "rgb(77, 74, 74)"
                }}
            >
                Home
            </NavLink>
            <NavLink className="navlink"
                exact to={"/cart"}
                activeStyle={{
                    fontWeight: "bold",
                    color: "rgb(77, 74, 74)"
                }}
            >
                Cart ({cartTotal})
            </NavLink>
            <img className='logo' src={logo} alt='NB' />
            {user && user.isAdmin ? <NavLink className="navlink"
                exact to={"/admin"}
                activeStyle={{
                    fontWeight: "bold",
                    color: "rgb(77, 74, 74)"
                }}
            >
                Admin Page
            </NavLink> : null}
            {user && user.isAdmin ? null : <a className="navlink" href='#footer'>Contact</a>}
            {user ? <Link className="navlink"
                exact to={"/"}>
                <a onClick={clearStorage}>
                    Log Out
                                </a>
            </Link>
                :
                <NavLink className="navlink"
                    exact to={"/signin"}
                    activeStyle={{
                        fontWeight: "bold",
                        color: "rgb(77, 74, 74)"
                    }}
                >
                    Sign in/up
                </NavLink>
            }
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <NavLink
                className='cart-icon'
                exact to={"/cart"}
                activeStyle={{
                    fontWeight: "bold",
                    color: "rgb(77, 74, 74)"
                }}>
                <i class="fas fa-shopping-cart"></i>({cartTotal})
            </NavLink>
        </nav>
    );
};

export default Nav
