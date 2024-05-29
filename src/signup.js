import { signUpUser } from './cognito';

document.getElementById('signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const phone = document.getElementById('phone').value;
  try {
    await signUpUser(username, password, email, phone);
    //alert('Sign-up successful! Redirecting to login page...');
    document.getElementById('error-message').textContent = "Sign-up successful! Redirecting..."
    window.location.href = 'index.html';
  } catch (error) {
    document.getElementById('error-message').textContent = error.message;
  }
});