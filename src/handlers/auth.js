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
          console.error("Google Sign-in Error:", error.message);
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
      console.log("User logged in:", userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Login Error:", error.message);
      throw error;
    }
  },
};

export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw error;
  }
};

export default firebaseAuth;
