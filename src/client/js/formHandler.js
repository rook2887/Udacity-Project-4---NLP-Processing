
const serverURL = 'https://api.meaningcloud.com/sentiment-2.1';
const apiKey = 'ae612bcf0ded3c530bf2a606cae10ad5';
const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  // Get the text from the input field
  const formText = document.getElementById('name').value;

  // Check if the text is valid
  if (formText) {
    // Send the text to the server using the serverURL constant above
    sendDataToServer(formText);
  } else {
    alert('Please enter some text to analyze');
  }
}

// Function to send data to the server
function sendDataToServer(text) {
  fetch(`${serverURL}?key=${apiKey}&txt=${encodeURIComponent(text)}&lang=en`, {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Server response:', data);
      updateUI(data);
    })
    .catch((error) => console.error('Error:', error));
}

// Function to update the UI with the results
function updateUI(data) {
  const resultsDiv = document.getElementById('results');
  if (data.status.code === "0") {
    resultsDiv.innerHTML = `
      <p>Score Tag: ${data.score_tag}</p>
      <p>Agreement: ${data.agreement}</p>
      <p>Subjectivity: ${data.subjectivity}</p>
      <p>Confidence: ${data.confidence}</p>
      <p>Irony: ${data.irony}</p>
      <p>Sentence: ${data.sentence_list[0].text}</p>
    `;
  } else {
    resultsDiv.innerHTML = `<p>Error: ${data.status.msg}</p>`;
  }
}

//   // Get the URL from the input field
//   const formText = document.getElementById('name').value;

//   // Check if the URL is valid
//   if (isValidURL(formText)) {
//     // If the URL is valid, send it to the server using the serverURL constant above
//     sendDataToServer(formText);
//   } else {
//     alert('Enter a valid URL');
//   }
// }

// // Function to validate the URL
// function isValidURL(string) {
//   const res = string.match(/(http|https):\/\/[^\s/$.?#].[^\s]*/);
//   return res !== null;
// }

// // Function to send data to the server
// function sendDataToServer(url) {
//   fetch(serverURL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ url: url }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log('Server response:', data);
//       // You can update the UI with the response data if needed
//     })
//     .catch((error) => console.error('Error:', error));
// }

// Export the handleSubmit function
export { handleSubmit };
