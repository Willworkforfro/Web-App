let userLoginStatus = {


    checkIfUserIsSignedIn: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in
          var uid = user.uid;
          console.log(user);
          // Replace this with your own confirmation UI (e.g., modal)
          if (confirm("Do you want to log out?")) {
            // If user confirms logout, sign out from Firebase
            firebase.auth().signOut().then(() => {
              // Sign-out successful.
              console.log("User signed out successfully");
              window.location.href = '/public/index.html';
            }).catch((error) => {
              // An error happened.
              console.error("Error signing out:", error);
            });
          }
        } else {
          // User is signed out
          // ...
        }
      });
    }
  };

