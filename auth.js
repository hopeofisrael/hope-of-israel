import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "./firebaseConfig";

const auth = getAuth(app);

export const emailSignUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const emailSignIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
