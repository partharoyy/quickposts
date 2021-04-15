import { auth, provider } from '../firebase'

export const signInWithGoogle = async () => {
    let user;
    await auth
        .signInWithPopup(provider)
        .then(res => {
            console.log(res.user);
            user = res.user;
        })
        .catch(err => {
            console.log(err.message);
        })

    return user;

}

export const signout = async () => {
    let signout_success;
    await auth
        .signOut()
        .then(() => {
            signout_success = true;
        })
        .catch(err => {
            console.log(err.message);
        })

    return signout_success;
}

