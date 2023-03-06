import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAlzbORTBFr6f2YvlVA_Mi6I75Imxeiyho",
    authDomain: "tp-securite.firebaseapp.com",
    projectId: "tp-securite",
    storageBucket: "tp-securite.appspot.com",
    messagingSenderId: "310158216059",
    appId: "1:310158216059:web:c508b269fe028537940bde"
  };
let firebaseApp;
firebaseApp=initializeApp(firebaseConfig);

export const auth = getAuth();

export default firebaseApp;