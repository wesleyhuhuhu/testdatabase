import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-2_JKcWhIXGi', // Your User Pool ID
  ClientId: '25g86rph1qj9eoba8gl4m8v8u5' // Your Client ID
};

const userPool = new CognitoUserPool(poolData);

export function loginUser(username, password) {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: username,
      Pool: userPool
    });

    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log('Login success:', result);
        resolve(result);
      },
      onFailure: (err) => {
        console.error('Login failure:', err);
        reject(err);
      }
    });
  });
}

export function signUpUser(username, password, email, phoneNumber) {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'phone_number', Value: phoneNumber })
    ];

    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        console.error('Sign-up failure:', err);
        reject(err);
      } else {
        console.log('Sign-up success:', result);
        resolve(result);
      }
    });
  });
}

export function getUserData(username) {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: username,
      Pool: userPool
    });

    user.getSession((err, session) => {
      if (err) {
        console.error('Get session failure:', err);
        reject(err);
      } else {
        user.getUserAttributes((err, attributes) => {
          if (err) {
            console.error('Get user attributes failure:', err);
            reject(err);
          } else {
            const userData = {};
            attributes.forEach(attribute => {
              userData[attribute.Name] = attribute.Value;
            });

            // Output user data into a <p> element
            const userDataParagraph = document.getElementById('userData');
            if (userDataParagraph) {
              userDataParagraph.innerHTML = `
                Username: ${username} <br>
                ${Object.keys(userData).map(key => `${key}: ${userData[key]}`).join('<br>')}
              `;
            }
            
            resolve(userData);
          }
        });
      }
    });
  });
}

export function updateZodiac(username, newZodiacValue) {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: username,
      Pool: userPool
    });

    const attributeList = [
      new CognitoUserAttribute({
        Name: 'custom:Zodiac',
        Value: newZodiacValue
      })
    ];

    user.getSession((err, session) => {
      if (err) {
        console.error('Get session failure:', err);
        reject(err);
      } else {
        user.updateAttributes(attributeList, (err, result) => {
          if (err) {
            console.error('Update attribute failure:', err);
            reject(err);
          } else {
            console.log('Attribute update success:', result);
            resolve(result);
          }
        });
      }
    });
  });
}

export function getZodiac(username) {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: username,
      Pool: userPool
    });

    user.getSession((err, session) => {
      if (err) {
        console.error('Get session failure:', err);
        reject(err);
      } else {
        user.getUserAttributes((err, attributes) => {
          if (err) {
            console.error('Get user attributes failure:', err);
            reject(err);
          } else {
            const zodiacAttribute = attributes.find(attribute => attribute.Name === 'custom:Zodiac');
            if (zodiacAttribute) {
              resolve(zodiacAttribute.Value);
            } else {
              reject(new Error('Zodiac attribute not found'));
            }
          }
        });
      }
    });
  });
}