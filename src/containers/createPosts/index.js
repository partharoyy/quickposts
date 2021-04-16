import firebase from 'firebase';
import React, { useContext, useState } from 'react'
import { SignInBtn } from '../../components'
import { UserContext } from '../../contexts/user'
import './style.css'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import makeId from '../../helper/functions';
import { db, storage } from '../../firebase';

const CreatePost = () => {

    const [user, setUser] = useContext(UserContext).user;
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const changeHandler = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);

            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);

            var imagePreview = document.getElementById("image-preview");
            //we cannot use above image because below in img tag we have not 
            // defined any src so by default it will fall back to alt i.e none
            //assigned above selected src to image tag below
            imagePreview.src = selectedImageSrc;
            imagePreview.style.display = "block";

        }
    }

    const uploadHandler = () => {
        if (image) {
            var imageName = makeId(10);
            //create reference where image will be stored and using put store image there
            const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);

            uploadTask.on("state_changed", (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                setProgress(progress);
            }, err => {
                console.log(err);
            }, () => {
                //to get download url and upload the post info
                storage.ref('images').child(`${imageName}.jpg`).getDownloadURL()
                    //by now we get the url
                    .then((imageUrl) => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            photoUrl: imageUrl,
                            username: user.email.replace("@gmail.com", ""),
                            profileUrl: user.photoURL
                        })
                    })
            })
        }
    }

    return (
        <div className="create-post">
            {user ? (
                <div className="createPost__loggedIn">
                    <p>Create post</p>
                    <div className="createPost__loggedInCenter">
                        <textarea
                            className="createPost__textArea"
                            rows="3"
                            value={caption}
                            placeholder="enter caption here.."
                            onChange={(e) => setCaption(e.target.value)}>
                        </textarea>
                        <div className="createPost__imagePreview">
                            <img id="image-preview" alt="" />
                        </div>
                    </div>
                    <div className="createPost__input">
                        <label >
                            <AddAPhotoIcon style={{ cursor: "pointer", fontSize: "20px" }} />
                            <input type="file" accept="images/*" onChange={changeHandler} />
                        </label>
                        <button className="createPost__uploadBtn" onClick={uploadHandler}
                            style={{ color: caption ? "#000" : "lightgrey" }}>
                            {`Upload ${progress != 0 ? progress : ""}`}
                        </button>
                    </div>
                </div>

            ) : (
                <div>
                    <SignInBtn />
                    <p style={{ marginLeft: "12px" }}>to post and comment</p>
                </div>
            )}

        </div>
    )
}

export default CreatePost
