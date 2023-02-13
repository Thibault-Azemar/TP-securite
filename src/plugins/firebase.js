import firebaseConfig from "../config/firebase";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import "firebase/database";

const firebaseApp=initializeApp(firebaseConfig);
const db=getDatabase();

export default {firebaseApp, db};