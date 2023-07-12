function sendDataToServer(email, password) {
  // Check if any required field is empty
  if (!email || !password) {
    console.error('Error: Missing required fields');
    return;
  }

  let data = {
    email,
    password,
  };

  fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (response.ok) {
        window.location.replace('/');
        // Request was successful
        return response.text();
      } else {
        // Request failed or server returned an error
        throw new Error('Error: ' + response.status);
      }
    })

    .catch(function (error) {
      console.error(error);
    });
}

document
  .getElementById('sign-in-form')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Get the form values
    let email = document.getElementById('sign-in-email').value;
    let password = document.getElementById('sign-in-password').value;

    // Send the form data to the server
    sendDataToServer(email, password);
  });
