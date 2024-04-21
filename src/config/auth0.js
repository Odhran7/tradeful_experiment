// This is the config file for Auth0

import dotenv from "dotenv";

dotenv.config();

const auth0Config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: "http://localhost:3000",
  clientID: "9WDZf6lxfWQHatqd8hf5Zpw3BkP9VjZX",
  issuerBaseURL: "https://dev-0nxzl9co.eu.auth0.com",
};

export default auth0Config;
