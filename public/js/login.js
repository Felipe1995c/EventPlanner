const loginFormHandler = async (event) => {
    event.preventDefault();
    console.log("Running Login Logic")
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

const registerFormHandler = async (event) => {
  console.log("Running Register Logic")
  // we want to prevent the DEFAULT BROWSER BEHAVIOR (of refreshing the page)
  event.preventDefault()
  // we need to capture the INPUT DATA
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // NOW we HAVE data --> Lets SEND it to our SERVER/API 
  // We run a little validation
  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log("API response: ", response)
    if (response.ok) {
    //  document.location.replace('/profile');
      document.location.replace('/');
    } else {
      alert('Failed to Register');
    }
  }
}

document
  .querySelector('.signup-form')
  .addEventListener('submit', registerFormHandler);