const host='http://localhost:8080'
const cartEndPoint=host+'/cart'

const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': auth(),
    "X-XSRF-TOKEN": CSRF_TOKEN
  }


export async function restApi_CartList() {
  const res = await fetch(cartEndPoint + '/list', {
    method: 'GET',
    credentials: "include",
    headers: headers
  });
  return await res.json();
}

export async function restApi_CartAdd(product) {
  const res = await fetch(cartEndPoint + '/add', {
    method: 'POST',
    credentials: "include",
    headers: headers,
    body: '{ "item": ' + JSON.stringify(product) + '}'
  });
  return await res.json();
}

export async function restApi_CartClean() {
  const res = await fetch(cartEndPoint + '/list', {
    method: 'DELETE',
    credentials: "include",
    headers: headers
  });
  return await res.json();
}

function auth() {
  return 'Basic ' + btoa('user:user');
}

export default restApi_CartList;