import firebaseConfig from "./config.js";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {
    GoogleAuthProvider, getAuth, signInWithPopup,
    signInWithEmailAndPassword, createUserWithEmailAndPassword,
    sendPasswordResetEmail, signOut
} from "firebase/auth";
import {
    getFirestore, query, getDocs, collection,
    where, addDoc
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if(docs.docs.length === 0){
            await addDoc(collection(db, "users"), {
                uid : user.uid,
                profile : user.photoURL,
                name : user.displayName,
                authProvider : "google",
                email : user.email
            });
        }
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Signed In");
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid : user.uid,
            name, email,
            authProvider : "local"
        });
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password Reset link sent");
    } catch (error) {
        console.log(error);
        alert(error.message);
    }   
}

const logout = () => {
    signOut(auth);
}

export {
    auth, db, storage, signInWithGoogle, logInWithEmailAndPassword,
    registerWithEmailAndPassword, sendPasswordReset, logout, sendPasswordResetEmail
}