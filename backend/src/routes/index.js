require('dotenv').config();
const YahooFantasy = require('yahoo-fantasy');
const express = require('express');
const app = express();

const yf = new YahooFantasy(
  process.env.YAHOO_CLIENT_ID,
  process.env.YAHOO_CLIENT_SECRET,
  (accessToken, refreshToken) => {
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);
  },
  process.env.REDIRECT_URI
);

app.get('/auth', (req, res) => {
  const authUrl = yf.authURL();
  res.redirect(authUrl);
});

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  try {
    await yf.setUserTokenFromCode(code);
    res.send('Authentication successful!');
  } catch (error) {
    res.status(500).send('Authentication failed.');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
