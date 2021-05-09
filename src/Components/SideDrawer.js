import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const SideDrawer = ({ setClick, user, clearStorage, cart }) => {

    const closeMobileMenu = () => {
        setClick(false)
    }

    const cartTotal = cart.reduce((total, item) => {
        return total + (item.quantity);
    }, 0)

    return (

        <nav className="side-drawer">
            <ul className="side-drawer-items">
                <li className="navlink-side">
                    <NavLink className="navlink-side"
                        onClick={closeMobileMenu}
                        exact to={"/"}>
                        <p>
                            Home
                            </p>
                    </NavLink>
                </li>
                <li className="navlink-side">
                    <NavLink className="navlink-side"
                        onClick={closeMobileMenu}
                        exact to={"/cart"}>
                        <p>
                            Cart ({cartTotal})
                            </p>
                    </NavLink>
                </li>
                <li className="navlink-side">
                    {user && user.isAdmin ? <NavLink className="navlink-side"
                        onClick={closeMobileMenu}
                        exact to={"/admin"}>
                        <p>
                            Admin Page
                            </p>
                    </NavLink> : null}
                </li>
                <li className="navlink-side">
                    {user ? <Link className="navlink-side"
                        onClick={closeMobileMenu}
                        exact to={"/"}>
                        <p onClick={clearStorage}>
                            Log Out
                            </p>
                    </Link>
                        :
                        <NavLink className="navlink-side"
                            onClick={closeMobileMenu}
                            exact to={"/signin"}>
                            <p>
                                Sign in/up
                            </p>
                        </NavLink>
                    }
                </li>
                <a className="navlink-side" href='#footer' onClick={closeMobileMenu}>Contact</a>
            </ul>
        </nav>

    );
};

export default SideDrawer
