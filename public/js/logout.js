const logout = function () {
  console.log('button pressed');
  fetch('/api/users/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(function (response) {
    if (response.ok) {
      window.location.reload();
    }
  }).catch(function (error) {
    console.error(error);
  });
};

document.getElementById("logout").addEventListener('click', logout);