import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../lib/firebase.config";

const provider = new GoogleAuthProvider();

const firebaseAuth = {
  signIn: () =>
    new Promise((resolve, reject) => {
      signInWithPopup(auth, provider)
        .then((response) => resolve(response.user))
        .catch((error) => {
          reject(error);
        });
    }),

  signOut: () =>
    signOut(auth)
      .then(() => console.log("User logged out"))
      .catch((error) => console.error("Logout Error:", error.message)),

  loginWithEmail: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },
};

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export default firebaseAuth;
