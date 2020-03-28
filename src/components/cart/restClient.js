import { rest } from "../restClient_axios";
import { host, getConfig, restApi_CartClean } from "../restClient_fetch";

export function load(restClient) {
    if (restClient==='Axios')
        return rest.get('/cart/list').then(res => res.data)
    else
        return restApi_CartList()
}

export function clean(restClient) {
    if (restClient==='Axios')
        return rest.delete('/cart/list')
    else
        return restApi_CartClean()
}

async function restApi_CartList() {
    const res = await fetch(host+'/cart/list', getConfig)
    return await res.json();
}
  
  