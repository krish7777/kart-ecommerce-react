import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { config } from "../utils";

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,

        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();

export const SignInWithGoogle = () => firebase.auth().signInWithPopup(provider);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
