// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC4m4DZwh6NzhCpv-Uvzd6N-3kDknu3QGY",
    authDomain: "snappy-cistern-434310-j1.firebaseapp.com",
    projectId: "snappy-cistern-434310-j1",
    storageBucket: "snappy-cistern-434310-j1.appspot.com",
    messagingSenderId: "310484394792",
    appId: "1:310484394792:web:06a6680b2f25f62b9f661d",
    measurementId: "G-TBY6QZT640"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage };
