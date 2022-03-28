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

function getUser(token) {
  const config = createConfig(token);
  return axios.get(`${BASE_URL}/users`, config);
}

async function getTimeline(token) {
  const config = createConfig(token);
  return await axios.get(`${BASE_URL}/feed`, config);
}

function updatePost(body, idPost) {
  return axios.put(`${BASE_URL}/feed/${idPost}`, body);
}

async function publishPost(body, token) {
  const config = createConfig(token);
  return await axios.post(`${BASE_URL}/feed`, body, config);
}

function deletePost(token, id) {
  const config = createConfig(token);
  return axios.delete(`${BASE_URL}/feed/${id}`, config);
}

function likePost(id, token) {
  const config = createConfig(token);
  return axios.patch(`${BASE_URL}/like/${id}`, null,config);
}

function unlikePost(id, token) {
  const config = createConfig(token);
  return axios.patch(`${BASE_URL}/unlike/${id}`, null,config);
}

async function getTrendingsHashtags(token) {
  const config = createConfig(token);
  return await axios.get(`${BASE_URL}/hashtag`, config);
}

async function getTrending(hashtagId, token) {
  const config = createConfig(token);
  return await axios.get(`${BASE_URL}/hashtag/${hashtagId}`, config);
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

export { signup, login, getTimeline, publishPost, deletePost, likePost, unlikePost, updatePost, getTrendingsHashtags, getTrending, getUser, getUserPosts, searchUsers, getAllUsers, getUserId };
