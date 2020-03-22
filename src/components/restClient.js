const host='http://localhost:8080'
const cartEndPoint=host+'/cart'

export async function restApiLoadCart() {
  const res = await fetch(cartEndPoint + '/list', {
    method: 'GET',
    credentials: "include",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('user:user')
    }
  });
  return await res.json();
}

export async function restApiCartAdd(product) {
  const res = await fetch(cartEndPoint + '/add', {
    method: 'POST',
    credentials: "include",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('user:user')
    },
    body: '{ "item": ' + JSON.stringify(product) + '}'
  });
  return await res.json();
}

export default restApiLoadCart;