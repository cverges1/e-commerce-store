function sendDataToServer(first_name, last_name, email, password) {
  // Check if any required field is empty
  if (!first_name || !last_name || !email || !password) {
    console.error('Error: Missing required fields');
    return;
  }

  let data = {
    first_name,
    last_name,
    email,
    password,
  };

  fetch('/api/users', {
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
        document.getElementById('error').textContent = 'Make sure password is at least 8 characters, and email is correct.';
        console.log(response);
        throw new Error('Error: ' + response.status);
      }
    })
    .then(function (responseText) {
      console.log(responseText);
    })
    .catch(function (error) {
      console.error(error);
    });
}

document
  .getElementById('sign-up-form')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Get the form values
    let first_name = document.getElementById('sign-up-first-name').value;
    let last_name = document.getElementById('sign-up-last-name').value;
    let email = document.getElementById('sign-up-email').value;
    let password = document.getElementById('sign-up-password').value;

    // Perform any additional validation or data manipulation if needed

    // Send the form data to the server
    sendDataToServer(first_name, last_name, email, password);
  });
