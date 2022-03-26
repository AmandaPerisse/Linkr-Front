import axios from "axios";

//const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BASE_URL = "https://top-linkr.herokuapp.com";
//const BASE_URL = "http://localhost:5000";

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

async function signup(body) {
  return await axios.post(`${BASE_URL}/users`, body);
}

async function login(body) {
  return await axios.post(`${BASE_URL}/login`, body);
}

async function publishPost(body, token) {
  const config = createConfig(token);
  return await axios.post(`${BASE_URL}/feed`, body, config);
}

async function getTimeline(token) {
    const config = createConfig(token);
    return await axios.get(`${BASE_URL}/feed`, config);
}

export { signup, login, publishPost, getTimeline };