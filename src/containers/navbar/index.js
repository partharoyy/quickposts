import React, { useState, useContext } from 'react'
import { SignInBtn } from '../../components'
import { UserContext } from '../../contexts/user'
import './style.css'


const Navbar = () => {

    const [user, setUser] = useContext(UserContext).user;

    return (
        <div className="navbar">
            <p>quickposts</p>
            {user ? <img className='navbar-image' alt="profile-pic" src={user.photoURL} /> : <SignInBtn />}
        </div>
    )
}

export default Navbar
