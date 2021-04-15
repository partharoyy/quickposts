import React from 'react'
import { SignInBtn } from '../../components'
import './style.css'

const CreatePost = () => {
    return (
        <div className="create-post">
            <SignInBtn />
            <p style={{ marginLeft: "12px" }}>to post and comment</p>
        </div>
    )
}

export default CreatePost
