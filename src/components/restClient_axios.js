import axios from 'axios'
import Cookies from 'js-cookie';

const host='http://localhost:8080'

const CSRF_TOKEN = Cookies.get('XSRF-TOKEN') // document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1]; //test crash

export const rest = axios.create({
  baseURL: host,
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