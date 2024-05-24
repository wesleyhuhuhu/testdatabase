import { loginUser } from './login';

document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  try {
    await loginUser(username, password);
    alert('Login successful');
  } catch (error) {
    document.getElementById('error-message').textContent = error.message;
  }
});