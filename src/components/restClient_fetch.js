import cloneDeep from 'lodash/cloneDeep';
import Cookies from 'js-cookie';

const host='http://localhost:8080'
const cartEndPoint=host+'/cart'

const CSRF_TOKEN = Cookies.get('XSRF-TOKEN') //document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1]; //test crash

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': auth(),
    "X-XSRF-TOKEN": CSRF_TOKEN
  }

const config = {
  credentials: "include",
  headers: headers
}
const getConfig = cloneDeep(config);    getConfig.method='GET'
const postConfig = cloneDeep(config);   postConfig.method='POST'
const deleteConfig = cloneDeep(config); deleteConfig.method='DELETE'

function auth() {
  return 'Basic ' + btoa('user:user');
}

function post(body) {
  const config = cloneDeep(postConfig)
  config.body=body
  return config
}

export async function restApi_CartList() {
  const res = await fetch(cartEndPoint + '/list', getConfig)
  return await res.json();
}

export async function restApi_CartAdd(product) {
  const res = await fetch(cartEndPoint + '/add', post('{ "item": ' + JSON.stringify(product) + '}'));
  return await res.json();
}

export async function restApi_CartClean() {
  const res = await fetch(cartEndPoint + '/list', deleteConfig);
  return await res.json();
}

export default restApi_CartList;