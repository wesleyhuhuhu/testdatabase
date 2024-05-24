import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

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