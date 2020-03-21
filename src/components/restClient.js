const host='http://localhost:8080'

export function restApiLoadCart() {
    return fetch(host+'/cart/list',
        { method: 'GET',
          credentials: "include",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic '+btoa('user:user')
          }
        }
    )
    .then(res => res.json())
    .catch(console.log);
  }

export function restApiCartAdd(product) {
    return fetch(host+'/cart/add', {
        method: 'POST',
        credentials: "include",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic '+btoa('user:user')
        },
        body: '{ "item": '+JSON.stringify(product) +'}'
    }).then(res => res.json())
    .catch(console.log)
}

export default restApiLoadCart;