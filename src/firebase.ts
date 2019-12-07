import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseDevConfig = {
  apiKey: "AIzaSyBFm3zOtJrkf2FncCDtQBRMex0faPNqMZc",
  authDomain: "base.usefound.app", // TODO replace
  databaseURL: "https://found-257522.firebaseio.com",
  projectId: "found-257522",
  storageBucket: "found-257522.appspot.com",
  messagingSenderId: "189337579021",
  appId: "1:189337579021:web:503a140b00ed892120af44",
  measurementId: "G-K5QP3SKMG6"
};

// Add prod firebase config

const firebaseApp = firebase.initializeApp(firebaseDevConfig);

export function createUserWithEmailAndPassword(
  email: string,
  password: string
) {
  firebase.auth().createUserWithEmailAndPassword(email, password);
}

export async function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("profile");
  provider.addScope("email");
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      return user;
    })
    .catch(function(error) {
      // Handle Errors here.
      throw error;
    });
}

export async function getCurrentUser() {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    return null;
  }
  return currentUser.getIdToken();
}

export default firebaseApp;
