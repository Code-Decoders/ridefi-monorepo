// firebase.js
import { initializeApp, getApps } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp, setDoc, doc, getDoc } from "firebase/firestore";
import { createWallet } from "./coinbaseService";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCCkr_hdh6pgR-idagp1kMLKI86DZqxIA",
    authDomain: "ridefi-97858.firebaseapp.com",
    projectId: "ridefi-97858",
    storageBucket: "ridefi-97858.firebasestorage.app",
    messagingSenderId: "329642885902",
    appId: "1:329642885902:web:257387150b5ba2ca158d5f",
    measurementId: "G-EW7GP2F160"
};

// Initialize Firebase (check to avoid re-initializing)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);


export async function createUser({
    name, email, password
}) {
    try {
        const walletData = await createWallet();
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        // create doc in users collection
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            name: name,
            uid: user.uid,
            createdAt: serverTimestamp(),
            walletId: walletData.walletId,
            seed: walletData.seed
        });
        return user;
    } catch (err) {
        return err;
    }
}

export async function onUserChanged() {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    });
}


export async function logout() {
    return auth.signOut();
}

export async function getUserData(uid) {
    const docSnap = await getDoc(doc(db, "users", uid));
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}

