import axios from 'axios'

const host='http://localhost:8080'
const cartEndPoint=host+'/cart'

const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];

export const rest = axios.create({
  baseURL: cartEndPoint,
  timeout: 1000,
  auth: {
    username: 'user',
    password: 'user'
  },
  headers: {
    "X-XSRF-TOKEN": CSRF_TOKEN
  },
  withCredentials: true,
});

export default rest;