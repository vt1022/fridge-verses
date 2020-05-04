import firebase from 'firebase/app';
import 'firebase/database';
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDoTP0Xz-PygNrXuRREHvJvOIdOk1kEbVI",
    authDomain: "fridgemagnetpoems.firebaseapp.com",
    databaseURL: "https://fridgemagnetpoems.firebaseio.com",
    projectId: "fridgemagnetpoems",
    storageBucket: "fridgemagnetpoems.appspot.com",
    messagingSenderId: "17676352973",
    appId: "1:17676352973:web:bb2f5253a5a36717a11884"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase