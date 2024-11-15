
  document.addEventListener('DOMContentLoaded', function () {
      const logoutButton = document.getElementById('logoutButton');

      if (logoutButton) {
          logoutButton.addEventListener('click', function () {
              // Make an AJAX request to the server to trigger logout
              fetch('/SCHOOL_Logout', {
                  method: 'GET',
                  credentials: 'include'  // Include credentials for cross-origin requests
              })
              .then(response => {
                  if (response.ok) {
                      // Successfully logged out, redirect to login page
                      window.location.href = '/auth/login'; // Replace with the actual login URL
                  } else {
                      // Handle error if needed
                      console.error('Logout failed');
                  }
              })
              .catch(error => {
                  console.error('Error during logout:', error);
              });
          });
      }
  });



  fetch('/back')
     .then(response => {
       if (response.ok) {
         // Successfully redirected, handle as needed
         // window.location.href = response.url;  // Redirect to the previous page
       } else {
         // Handle errors or redirects to login page
         window.location.href = '/auth/login';
       }
     })
     .catch(error => {
       console.error('Error:', error);
     });
