import { Client } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.REACT_APP_API_ENDPOINT) // Your API Endpoint
    .setProject(process.env.REACT_APP_PROJECT_ID);   // Your project ID

export default client;