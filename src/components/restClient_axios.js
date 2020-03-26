import axios from 'axios'
import Cookies from 'js-cookie';

const host='http://localhost:8080'
const cartEndPoint=host+'/cart'

const CSRF_TOKEN = Cookies.get('XSRF-TOKEN') // document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1]; //test crash

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