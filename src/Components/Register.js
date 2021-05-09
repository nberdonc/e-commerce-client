import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { addUser, displayUsers } from '../AxiosLink'

const Register = ({ userList, setUserList }) => {

    ////////////////////////////// TO DISPLAY ALL USERS //////////////////////////////

    useEffect(async () => {
        let userList = await displayUsers()
        setUserList(userList)
    }, [])

    /////////////////// TO REGISTER ONE USER /////////////////////

    const [emailmessage, setEmailMessage] = useState("")
    const [passmessage, setPassMessage] = useState("")
    const [SecondPassmessage, setSecondPassMessage] = useState("")
    const [registered, setRegistered] = useState("")
    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [sndPassword, setSndPassword] = useState("")


    const hideMsg = () => {
        setEmailMessage("")
        setPassMessage("")
        setSecondPassMessage("")
        setRegistered("")
    }

    let handleNameChange = (e) => {
        setName(e.target.value)
    }
    let handleLastNameChange = (e) => {
        setLastName(e.target.value)
    }
    let handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    let handlePassChange = (e) => {
        setPassword(e.target.value)
    }
    let handleSndPassChange = (e) => {
        setSndPassword(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        let status = true
        let isAdmin = false

        if (e.target.pass.value.length < 8) {
            status = false
            setPassMessage(<p className="red">Password must have at least 8 characters.</p>)
            setTimeout(hideMsg, 2000)
        }
        else { setPassMessage("") }

        if (e.target.pass.value !== e.target.secondPass.value) {
            status = false
            setSecondPassMessage(<p className="red">Passwords should match.</p>)
            setTimeout(hideMsg, 2000)
        }
        else { setSecondPassMessage("") }

        if (status === false) { console.log("wrong info") }
        else {
            let response = await addUser(e.target.name.value, e.target.lastname.value, e.target.email.value, e.target.pass.value, isAdmin)
            console.log("from register", response)
            if (response === false) {
                setRegistered(<p className="red">E-mail provided already exists.</p>)
                setTimeout(hideMsg, 2000)
            }
            else {
                setUserList([...userList, response])
                setRegistered(<p className="green">You have been succesfully registered.</p>)
                setTimeout(hideMsg, 2000)
                setName("")
                setLastName("")
                setEmail("")
                setPassword("")
                setSndPassword("")
            }
        }
    }

    return (
        <div className='sign-form' id='register'>
            <h2>Register</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <input onChange={handleNameChange} name="name" value={name} type="text" placeholder='Name' className='sign-input' />
                </div>
                <div>
                    <input onChange={handleLastNameChange} name="lastname" value={lastName} type="text" placeholder='Last Name' className='sign-input' />
                </div>
                <div>
                    <input onChange={handleEmailChange} name="email" value={email} type="email" placeholder='e-mail*' className='sign-input' />
                    {emailmessage}
                </div>
                <div>
                    <input onChange={handlePassChange} name="pass" value={password} type="password" placeholder='Password*' className='sign-input' />
                    {passmessage}
                </div>
                <div>
                    <input onChange={handleSndPassChange} name="secondPass" value={sndPassword} type="password" placeholder='Repeat Password*' className='sign-input' />
                    {SecondPassmessage}
                </div>
                <button className='sign-input'>Register</button>
                <div className='form-text'>
                    <p>Already registered?
                        <Link exact to="/signin">
                            , Sign in
                        </Link></p>
                    <p>{registered}</p>
                </div>
            </form>
        </div>
    )
}

export default Register

