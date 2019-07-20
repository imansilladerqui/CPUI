  import firebase from 'firebase/app';
  import 'firebase/firestore';
  import 'firebase/auth';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBVS4eNWVRZjdM0zAkgV53_nJBYF3aNMUw",
    authDomain: "cambioposadas-d69c9.firebaseapp.com",
    databaseURL: "https://cambioposadas-d69c9.firebaseio.com",
    projectId: "cambioposadas-d69c9",
    storageBucket: "cambioposadas-d69c9.appspot.com",
    messagingSenderId: "601620283962",
    appId: "1:601620283962:web:4c206bce2c2daa0b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({timestampsInSnapshots: true});

  export default firebase;