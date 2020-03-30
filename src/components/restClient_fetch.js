import cloneDeep from 'lodash/cloneDeep';
import Cookies from 'js-cookie';

export const host='http://localhost:8080'

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
export const getConfig = cloneDeep(config);    getConfig.method='GET'
export const postConfig = cloneDeep(config);   postConfig.method='POST'
export const deleteConfig = cloneDeep(config); deleteConfig.method='DELETE'

function auth() {
  return 'Basic ' + btoa('user:user');
}

function post(body) {
  const postCfg = cloneDeep(postConfig)
  postCfg.body=body
  return postCfg
}

export async function restApi_CartAdd(product) {
  const res = await fetch(host+'/cart/add', post('{ "item": ' + JSON.stringify(product) + '}'));
  return await res.json();
}

export async function restApi_CartClean() {
  const res = await fetch(host+'/cart/list', deleteConfig);
  return await res.json();
}
