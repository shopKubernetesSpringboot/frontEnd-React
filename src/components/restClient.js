const host='http://localhost:8080'
const cartEndPoint=host+'/cart'

export async function restApi_CartList() {
  const res = await fetch(cartEndPoint + '/list', {
    method: 'GET',
    credentials: "include",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': auth()
    }
  });
  return await res.json();
}

export async function restApi_CartAdd(product) {
  const res = await fetch(cartEndPoint + '/add', {
    method: 'POST',
    credentials: "include",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': auth()
    },
    body: '{ "item": ' + JSON.stringify(product) + '}'
  });
  return await res.json();
}

export async function restApi_CartClean() {
  const res = await fetch(cartEndPoint + '/list', {
    method: 'DELETE',
    credentials: "include",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': auth()
    }
  });
  return await res.json();
}

function auth() {
  return 'Basic ' + btoa('user:user');
}

export default restApi_CartList;