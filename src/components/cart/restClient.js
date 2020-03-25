import { rest } from "../restClient_axios";
import { restApi_CartClean, restApi_CartList } from "../restClient_fetch";

export function load(restClient) {
    if (restClient==='Axios')
        return rest.get('/list').then(res => res.data)
    else
        return restApi_CartList()

}

export function clean(restClient) {
    if (restClient==='Axios')
        return rest.delete('/list')
    else
        return restApi_CartClean()
}