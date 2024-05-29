import { updateZodiac, loginUser, getUserData, getZodiac } from './cognito';


document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  try {
    await loginUser(username, password);
    // const loginStatus = document.getElementById('loginStatus');
    // loginStatus.innerHTML = "Login Successful";
    localStorage.setItem('username', username);
    await getUserData(username);
    //alert('Userdata Shown');
    const zodiacSign = await getZodiac(username);
    document.getElementById('zodiacLabel').textContent = `Zodiac: ${zodiacSign}`;
  } catch (error) {
    document.getElementById('error-message').textContent = error.message;
  }
});


document.getElementById('zodiacForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const newZodiacValue = document.getElementById('zodiac').value;
    const username = localStorage.getItem('username'); // Replace with the actual username
    console.log(username);
    console.log(newZodiacValue);

    try {
      const result = await updateZodiac(username, newZodiacValue);
      console.log('Zodiac updated successfully:', result);
      alert('Zodiac updated successfully!');
    } catch (error) {
      console.error('Failed to update Zodiac:', error);
      alert('Failed to update Zodiac: ' + error.message);
    }
});