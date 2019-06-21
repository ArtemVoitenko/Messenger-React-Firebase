import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
var firebaseConfig = {
  apiKey: "AIzaSyBc8qf6AhVFViEh8JpVgUf5947eJ4RLAYU",
  authDomain: "messenger-react.firebaseapp.com",
  databaseURL: "https://messenger-react.firebaseio.com",
  projectId: "messenger-react",
  storageBucket: "messenger-react.appspot.com",
  messagingSenderId: "196645012975",
  appId: "1:196645012975:web:49e462c7b507a2ac"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
