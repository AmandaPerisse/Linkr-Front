import axios from "axios";

// const BASE_URL = "https://top-linkr.herokuapp.com";
const BASE_URL = "http://localhost:5000";

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

async function signup(body) {
  return await axios.post(`${BASE_URL}/users`, body);
}

async function login(body) {
  return await axios.post(`${BASE_URL}/login`, body);
}

function getUser(token) {
  const config = createConfig(token);
  return axios.get(`${BASE_URL}/users`, config);
}
function deletePost(token, id) {
  const config = createConfig(token);
  return axios.delete(`${BASE_URL}/feed/${id}`, config);
}

async function publishPost(body, token) {
  const config = createConfig(token);
  return await axios.post(`${BASE_URL}/feed`, body, config);
}

async function getTimeline(token) {
  const config = createConfig(token);
  return await axios.get(`${BASE_URL}/feed`, config);
}

async function getUserPosts(id, token) {
  const config = createConfig(token);
  return await axios.get(`${BASE_URL}/user/${id}`, config);
}

async function searchUsers(body) {
  return await axios.get(`${BASE_URL}/searchusers`, body);
}

async function getAllUsers() {
  return await axios.get(`${BASE_URL}/allusers`);
}

async function getUserId(id) {
  return await axios.get(`${BASE_URL}/getuser/${id}`);
}

export { signup, login, publishPost, getTimeline, deletePost, getUser, getUserPosts, searchUsers, getAllUsers, getUserId };