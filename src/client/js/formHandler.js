// Replace checkForName with a function that checks the URL

const serverURL = 'https://localhost:8000/api';
const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  // Get the URL from the input field
  const formText = document.getElementById('name').value;

  // Check if the URL is valid
  if (isValidURL(formText)) {
    // If the URL is valid, send it to the server using the serverURL constant above
    sendDataToServer(formText);
  } else {
    alert('Enter a valid URL');
  }
}

// Function to validate the URL
function isValidURL(string) {
  const res = string.match(/(http|https):\/\/[^\s/$.?#].[^\s]*/);
  return res !== null;
}

// Function to send data to the server
function sendDataToServer(url) {
  fetch(serverURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: url }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Server response:', data);
      // You can update the UI with the response data if needed
    })
    .catch((error) => console.error('Error:', error));
}

// Export the handleSubmit function
export { handleSubmit };
