import firebase from "firebase";

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDiCc3Ixqdkjm0nTua2FyEKCAVXwFByUGk",
//     authDomain: "quickposts-a4a72.firebaseapp.com",
//     projectId: "quickposts-a4a72",
//     storageBucket: "quickposts-a4a72.appspot.com",
//     messagingSenderId: "253556249416",
//     appId: "1:253556249416:web:0d550fbc4594c6ab5b197d"
// };
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, storage, auth, provider };
