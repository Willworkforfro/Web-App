
let userID = "";


let noteApp = {
    notesArray: [],

    addTo: function (userCredential) {
        let blogData = {
            title: document.getElementById('title-input').value,
            content: document.getElementById('content-input').value,
            date: new Date().getTime(),
            author: document.getElementById('author-input').value,
            imagePrompt: document.getElementById('image-prompt-input').value,
            category: document.getElementById('category-input').value,
            dateTime: document.getElementById('appointment-time').value,
        };

        this.userID = userCredential.user.uid;

        var docRef = db.collection("Notes").doc(this.userID);

        docRef.get().then((doc) => {
            if (doc.exists) {
                this.notesArray = doc.data().notes || [];
            } else {
                this.notesArray = [];
            }

           // Check if the blogData is already in the array
           const existingBlogIndex = this.notesArray.findIndex(blog => blog.title === blogData.title && blog.content === blogData.content);
           if (existingBlogIndex === -1 && (blogData.title.trim() !== '' || blogData.content.trim() !== '')) {
               this.notesArray.push(blogData);
           } else if (existingBlogIndex !== -1) {
               this.notesArray[existingBlogIndex] = blogData;
           }
   

            db.collection("Notes").doc(this.userID).set({
                    notes: this.notesArray
                })
                .then(() => {
                    
                    console.log("Document data:", doc.data());
                    console.log("Document successfully written!");
                    this.readAll();
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    },
  
    resetBlogData: function() {
    document.getElementById('title-input').value = '';
    document.getElementById('content-input').value = '';
    document.getElementById('author-input').value = '';
    document.getElementById('author-input').value= '';
    document.getElementById('image-prompt-input').value = '';
    document.getElementById('category-input').value = '';
    document.getElementById('appointment-time').value = '';
        // Add other field resets here similarly
    },

    addToCurrentUser: async function() {
        try {
            const userCredential = await getCurrentUserCredentials();
            this.addTo(userCredential);
            this.resetBlogData(); // Reset fields after adding data
        } catch (error) {
            console.error("Error adding data:", error);
        }
    },



                    // // RENDER BLOG POSTS // // 

                        // getAllDocuments
                        // displayAllDocuments in HTML Page
    


                        readAll: function () {
                            var docRef = db.collection("Notes").doc(this.userID);
                    
                            docRef.get().then((doc) => {
                                if (doc.exists) {
                                    document.getElementById('display-posts').innerHTML = '';
                                    if (Array.isArray(doc.data().notes)) {
                                        for (let i = 0; i < doc.data().notes.length; i++) {
                                            let blog = doc.data().notes[i];
                                            let element = document.getElementById('display-posts');
                                            element.innerHTML += '<p>' + blog.title + '<br>' + blog.content + '<br>' +
                                                ' <button class="editButton" onclick="noteApp.editPost(' + i + ')">Edit</button>' +
                                                ' <button class="updateButton" onclick="noteApp.updatePost(' + i + ')">Update</button>' +
                                                ' </p>';
                                        }
                                    }
                                } else {
                                    console.log("No such document!");
                                }
                            }).catch((error) => {
                                console.log("Error getting document:", error);
                            });
                        },


   
                        







editPost: function (index) {
var docRef = db.collection("Notes").doc(userID);

docRef.get().then((doc) => {
if (doc.exists) {
  let blog = doc.data().blogs[index];
  document.getElementById('content-input').value = blog.content;
  document.getElementById('content-input').disabled = false; // Enable editing
  document.getElementById('title-input').value = blog.title;
  document.getElementById('author-input').value = blog.author;
} else {
  console.log("No such document!");
}
}).catch((error) => {
console.log("Error getting document:", error);
});
},

updatePost: function (index) {

let blogData = {

title: document.getElementById('title-input').value,
content: document.getElementById('content-input').value,
date: new Date().getTime(),
author: document.getElementById('author-input').value,
imagePrompt: document.getElementById('image-prompt-input').value,
category: document.getElementById('category-input').value,
dateTime: document.getElementById('appointment-time').value,
};

var docRef = db.collection("Notes").doc(userID);
docRef.get().then((doc) => {
if (doc.exists) {
  let notes = doc.data().notes;
  notes[index] = blogData;

  docRef.set({ notes: notes })
    .then(() => {
      console.log("Document successfully updated!");
      noteApp.readAll();
      // Reset fields after updating
      document.getElementById('title-input').value = '';
      document.getElementById('content-input').value = '';
      document.getElementById('author-input').value = '';
    document.getElementById('author-input').value= '';
    document.getElementById('image-prompt-input').value = '';
    document.getElementById('category-input').value = '';
    document.getElementById('appointment-time').value = '';
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
} else {
  console.log("No such document!");
}
}).catch((error) => {
console.log("Error getting document:", error);
});

}

}


document.addEventListener('DOMContentLoaded', function() {
   // Check if the user is logged in using Firebase Authentication
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in
      let userCredential = {
        user: user,
        // Other relevant user data
      };

      noteApp.addTo(userCredential);
      noteApp.readAll();
    } else {
      // User is signed out
      // Handle the case where the user is not logged in
    }
  });
  });

// Get current user credentials from Firebase Authentication
function getCurrentUserCredentials() {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe();
        if (user) {
          resolve({ user: { uid: user.uid /* add other user data if needed */ } });
        } else {
          reject("No user is currently logged in.");
        }
      });
    });
  }
  
//   // Function to add a note using the current user's credentials
//   async function addToCurrentUser() {
//     try {
//       const userCredential = await getCurrentUserCredentials();
//       noteApp.addTo(userCredential);
//     } catch (error) {
//       console.error(error);
//     }
//   }
