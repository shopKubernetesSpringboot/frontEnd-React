import { rest } from "../restClient_axios";
import { getConfig } from "../restClient_fetch";

export function load(restClient,search) {
    if (restClient==='Axios')
        return rest.get('http://localhost:8081/product/'+(search===''?'list':'find/'+search)).then(res => res.data)
    else
        return list(search)

}


async function list(search) {
    const res = await fetch('http://localhost:8081/product/'+(search===''?'list':'find/'+search), getConfig)
    return await res.json();
}