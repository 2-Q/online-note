import firebase from "./init"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const methodLoginSocialMedia = async (provider) => {
    const auth = getAuth();

    // ====== optional ======> me
    auth.languageCode = 'it';
    // To apply the default browser preference instead of explicitly setting it.
    // firebase.auth().useDeviceLanguage();
    provider.setCustomParameters({
        'login_hint': '243dwiki.com@gmail.com'
    });

    // ===== end optional =====> me

    return signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            return user
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            return error
        });
}


export default methodLoginSocialMedia