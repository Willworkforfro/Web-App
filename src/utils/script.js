

let renderMain = {
  userID: '',

  readAll: function () {
      let docRef = db.collection("Notes").doc(this.userID);

      docRef.get().then((doc) => {
          if (doc.exists) {
              let element = document.getElementById('appointments-display');
              if (element) {
                  element.innerHTML = '';
                  if (Array.isArray(doc.data().notes)) {
                      doc.data().notes.forEach(blog => {
                          if (blog.category === 'appointment' || blog.category === 'reminder') {
                              console.log("Category: ", blog.category);
                              console.log("Title: ", blog.title);
                              console.log("Content: ", blog.content);

                              element.innerHTML += `<p><span style="font-weight: bold; color: rgb(85, 142, 16);">${blog.title}</span><br>${blog.content}</p>`;
                          }
                      });
                  }
              } else {
                  console.log("Element with ID 'appointments-display' not found.");
              }
          } else {
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });
  }
};

// Function to set userID and call readAll
function setUserIDAndDisplayNotes() {
  firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
          renderMain.userID = user.uid;
          renderMain.readAll();
      } else {
          // Handle the case where the user is not logged in
          console.log('User not authenticated.');
      }
  });
}

// Call the function when the window loads
window.addEventListener('load', setUserIDAndDisplayNotes);


window.onload = () => {
  // Replacing data retrieval logic, assuming 'notes' holds your notes data
  const notes = [
    { title: 'Note 1', content: 'Content for Note 1', category: 'blog' },
    { title: 'Note 2', content: 'Content for Note 2', category: 'blog' },
    // Add more notes here
  ];

  const renderDisplay = document.querySelector('.render-display');
  notes.forEach((note, index) => {
    // Creating unique IDs for image and post content divs using the note's index
    const imageDisplayId = `image-display-${index}`;
    const postContentDisplayId = `post-content-display-${index}`;

    // Creating divs for image and post content
    const imageDiv = document.createElement('div');
    imageDiv.id = imageDisplayId;

    const postContentDiv = document.createElement('div');
    postContentDiv.id = postContentDisplayId;

    // Appending the image and post content divs to renderDisplay
    renderDisplay.appendChild(imageDiv);
    renderDisplay.appendChild(postContentDiv);

    // Fetching image (replace this logic with your image fetching logic)
    fetchImage(note.imagePrompt).then(imageUrl => {
      const imageDisplay = document.getElementById(imageDisplayId);
      imageDisplay.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
    });

    // Display post content
    const postContentDisplay = document.getElementById(postContentDisplayId);
    postContentDisplay.innerHTML = `<p><strong>${note.title}</strong><br>${note.content}</p>`;
  });
};

// Fetch image function (replace this with your actual image fetching logic)
function fetchImage(imagePrompt) {
  // Replace this with your actual image fetching logic or API call
  return new Promise((resolve) => {
    // Simulated image fetching (replace this with actual image URL)
    const imageUrl = `https://via.placeholder.com/150?text=${imagePrompt}`;
    resolve(imageUrl);
  });
}

// Function to navigate to blog edit (you can replace this with your logic)
function navigateToBlogEdit() {
  // Add logic to navigate to blog edit page
  console.log('Navigate to blog edit page');
}