import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBHCnC6yZ4CU95_Oz7ELtFdbtMBodYell8",
    authDomain: "eventecell-49861.firebaseapp.com",
    databaseURL: "https://eventecell-49861-default-rtdb.firebaseio.com",
    projectId: "eventecell-49861",
    storageBucket: "eventecell-49861.appspot.com",
    messagingSenderId: "271827895925",
    appId: "1:271827895925:web:6b6e300d67d2b91defda3c",
    measurementId: "G-SPEE3EZFER"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;