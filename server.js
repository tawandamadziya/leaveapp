const express = require('express');
const cors = require('cors');
const { PublicClientApplication } = require('@azure/msal-node');
const axios = require('axios');

const app = express();
const port = 19006;

const config = {
  auth: {
    clientId: '2059fd6c-314d-48a7-bd9a-3d9555447c6a',
    authority: 'https://login.microsoftonline.com/a4a6e0c1-b531-4689-a0a0-1ad2250ba843',
    clientSecret: 'ba875af4-6240-4435-8e02-65abb4d1d52b',
  },
  scopes: ['User.Read', 'User.ReadBasic.All'],
};

const pca = new PublicClientApplication(config);

app.use(cors()); // Enable CORS

app.get('/getDataverseData', async (req, res) => {
  try {
    const authCodeUrlParameters = {
      scopes: config.scopes,
      redirectUri: 'http://localhost:19006', // Update this with your actual redirect URI
    };

    // Get the URL to sign in the user
    const authUrl = await pca.getAuthCodeUrl(authCodeUrlParameters);

    // Redirect the user to the Azure AD login page
    res.redirect(authUrl);
  } catch (error) {
    console.error('Redirect Error:', error);
    res.status(500).json({ error: 'Redirect error' });
  }
});

app.get('/redirect', async (req, res) => {
  try {
    const tokenRequest = {
      code: req.query.code,
      scopes: config.scopes,
      redirectUri: 'http://localhost:19006', // Update this with your actual redirect URI
    };

    // Acquire token with authorization code
    const authResult = await pca.acquireTokenByCode(tokenRequest);

    // Log the access token to the terminal
    console.log('Access Token:', authResult.accessToken);

    const response = await axios.get('https://databalk.crm.dynamics.com/api/data/v9.1/systemuser', {
      headers: {
        Authorization: `Bearer ${authResult.accessToken}`,
      },
    });

    console.log('Successful Response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Axios Error:', error);
    res.status(500).json({ error: 'Token acquisition error' });
  }
});

app.listen(port, async () => {
  try {
    console.log(`Server is running at http://localhost:${port}`);
  } catch (error) {
    console.error(error);
  }
});
