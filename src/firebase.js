import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4aZyAfmNWK8cxjZpkYgLzsg5spsik8pk",
  authDomain: "virtual-meeting-room-a9ece.firebaseapp.com",
  projectId: "virtual-meeting-room-a9ece",
  storageBucket: "virtual-meeting-room-a9ece.appspot.com",
  messagingSenderId: "743384176392",
  appId: "1:743384176392:web:0d2cbf4fcb707aa854bebd",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
