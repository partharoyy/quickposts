import React, { useContext } from 'react'
import './style.css'
import { signInWithGoogle } from '../../services/auth'
import { UserContext } from '../../contexts/user'


const SignInBtn = () => {

    const [, setUser] = useContext(UserContext).user;

    const signInBtnClick = async () => {
        let user = await signInWithGoogle();
        if (user) setUser(user);
    }

    return (
        <div className="signInBtn">
            <p onClick={signInBtnClick}>Sign in with google</p>
        </div>
    )
}

export default SignInBtn
