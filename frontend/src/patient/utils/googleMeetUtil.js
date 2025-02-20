const fs=require('fs').promises
const path=require('path')
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {SpacesServiceClient} = require('@google-apps/meet').v2;
const { auth } = require('google-auth-library');

const SCOPES = ['https://www.googleapis.com/auth/meetings.space.created'];

const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

async function loadSavedCredentialsIfExist() {
    try {
      const content = await fs.readFile(TOKEN_PATH);
      const credentials = JSON.parse(content);
      return auth.fromJSON(credentials);
    } catch (err) {
      console.log(err);
      return null;
    }
  }


async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }