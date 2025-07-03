import { getFirestore, setDoc } from "firebase/firestore";
import app from "../lib/firebase.config";

const db = getFirestore(app);

const Firestore = {
    writeDoc: (...args) => {
        return new Promise(resolve => {
            try {

            } catch (error) {

            }
        })
    }
}