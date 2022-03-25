import axios from "axios";

//const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const BASE_URL = "http://localhost:5000";

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

async function publishPost(body, token) {
  const config = createConfig(token);

  return await axios.post(`${BASE_URL}/feed`, body, config);
}

async function getTimeline(token) {
    const config = createConfig(token);
  
    return await axios.get(`${BASE_URL}/feed`, config);
}

export { publishPost, getTimeline };