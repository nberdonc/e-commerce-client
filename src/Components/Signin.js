import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { signinUser } from '../AxiosLink'

const Signin = ({ setToHome, toHome, setUser, user }) => {
    const [message, setMessage] = useState("")

    const changeMsg = () => {
        setMessage("")
    }

    let counter = 3

    const submitSignIn = async (e) => {
        e.preventDefault()
        let signeduser = await signinUser(e.target.email.value, e.target.password.value)
        setUser(signeduser)
        console.log("signeduser", signeduser)
        localStorage.setItem('user', JSON.stringify(signeduser)) //store user data in local storage
        if (signeduser === undefined) {
            setMessage(<p className="red">Wrong email or password provided</p>)
        }
        else {
            if (signeduser.isAdmin === true) {
                setToHome(true)
            }
            else {
                setToHome(true)
            }
        }
        setToHome(false)
        let intervalId = setInterval(() => {
            if (counter === 0) {
                clearInterval(intervalId)
            }
        }, 1000)
        setTimeout(changeMsg, 4000)

    }

    return (
        <div className='sign-form' id='signin'>
            {toHome ? <Redirect from="/signin" to="/" /> : null}
            <h2>Sign in</h2>
            <form onSubmit={submitSignIn} >
                <div>
                    <input type="email" name="email" placeholder="e-mail*" className='sign-input' />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password*" className='sign-input' />
                </div>
                <button type="submit" className='sign-input'>Sign in</button>
                <div className='form-text'>
                    <p>Not a registered user?
                        <Link exact to="/register">
                            . Sign up here
                        </Link></p>
                    <p>{message}</p>
                </div>
            </form>
        </div>
    )
}

export default Signin


