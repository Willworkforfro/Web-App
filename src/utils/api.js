function navigateToBlogEdit() {
    window.location.href = '/public/blogedit.html';
  };   


// Inspirationl quote API

async function fetchQuote() {
    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error('There was a problem fetching the quote:', error);
      return 'Unable to fetch a quote at the moment.';
    }
  }

  function displayQuote() {
    const quoteContainer = document.querySelector('.daily-inspiration');
    fetchQuote().then((quote) => {
      quoteContainer.innerHTML = `<p>"${quote}"</p>`;
    });
  }


// SpeechSynthesis API to speak the text content

function readContent() {
    const appointmentsDisplay = document.getElementById('appointments-display');
    
    // Check if the element exists
    if (appointmentsDisplay) {
      const content = appointmentsDisplay.textContent;
  
      // Using the SpeechSynthesis API to speak the text content
      const speech = new SpeechSynthesisUtterance();
      speech.text = content;
  
      window.speechSynthesis.speak(speech);
    } else {
      console.log("Element'appointments-display' not found.");
    }
  }
  
  // Triggering the function to read content on button click
  const readButton = document.getElementById('post-button');
  
  readButton.addEventListener('click', () => {
    readContent();
  });

/* OPEN AI API */


  const apiKey = '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'; // Replace 'YOUR_OPENAI_API_KEY' with your actual API key
const apiUrl = 'https://api.openai.com/v1/images/generations';
const imageDisplay = document.getElementById('image-display');
const postContentDisplay = document.getElementById('post-content-display');

window.onload = () => {
  // Fetch image using the image prompt
  const imagePrompt = document.getElementById('image-prompt-input').value.trim(); // Get image prompt from input field
  if (imagePrompt) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: imagePrompt,
        n: 1,
        size: '1024x1024'
      })
    };

    fetch(apiUrl, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle the generated image data
        console.log('Generated image:', data);
        // Display the generated image
        if (data && data.images && data.images.length > 0) {
          const imageUrl = data.images[0].url;
          imageDisplay.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
        } else {
          imageDisplay.innerHTML = 'No image generated';
        }
      })
      .catch(error => {
        console.error('There was an error generating the image:', error);
        imageDisplay.innerHTML = 'Error generating image';
      });
  } else {
    // Show error or prompt user to enter a prompt
    imageDisplay.innerHTML = 'Please enter a prompt';
  }

  // Render blog posts with category 'blog'
  renderBlogPosts();
};

function renderBlogPosts() {
  // Simulated blog data with category 'blog'
  const blogPosts = [
    { title: 'Blog Post 1', content: 'Content for Blog Post 1', category: 'blog' },
    { title: 'Blog Post 2', content: 'Content for Blog Post 2', category: 'blog' },
    { title: 'Another Post', content: 'Another blog post content', category: 'blog' },
    { title: 'Non-blog Post', content: 'Non-blog content', category: 'other' }
    // Add more blog posts or retrieve from Firestore using similar logic
  ];

  // Filter and render blog posts with category 'blog'
  const blogPostsToRender = blogPosts.filter(post => post.category === 'blog');
  if (blogPostsToRender.length > 0) {
    postContentDisplay.innerHTML = blogPostsToRender
      .map(post => `<p><strong>${post.title}</strong><br>${post.content}</p>`)
      .join('');
  } else {
    postContentDisplay.innerHTML = 'No blog posts found';
  }
}