

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC8jefxDQ2BJXhqydnJdbrQ6b_FEKiHACI",
    authDomain: "daily-planner-final.firebaseapp.com",
    projectId: "daily-planner-final",
    storageBucket: "daily-planner-final.appspot.com",
    messagingSenderId: "84315021833",
    appId: "1:84315021833:web:f766dc583c56557fe1ced8"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();



