import axios from 'axios'
import { getConfig, deleteConfig, post } from "../restClient_fetch";
import { AXIOS } from '../RestClientSelector'
// import Cookies from 'js-cookie';

const host = 'http://localhost:8080'

export const rest = axios.create({
    baseURL: host,
    timeout: 2000,
    auth: {
        username: 'user',
        password: 'user'
    },
    withCredentials: true,
})

// let CSRF_TOKEN=''
// function setCSRF_TOKEN() {
//     if (CSRF_TOKEN==='') {
//         CSRF_TOKEN=Cookies.get('XSRF-TOKEN') // document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1]; //test crash
//         rest.defaults.headers.common['X-XSRF-TOKEN'] = CSRF_TOKEN
//     }
// }

// let SESSION=''
// function setSESSION() {
//     if (SESSION==='') {
//         SESSION=Cookies.get('SESSION')
//         rest.defaults.headers.common['SESSION'] = SESSION
//     }
// }

export function list(restClient) {
    if (restClient === AXIOS) return rest.get('/cart/list').then((res) => res.data);
    else return restApi_CartList()
}

export function add(restClient, product) {
    if (restClient === AXIOS) return rest.post('/cart/add', { item: product })
    else return restApi_CartAdd(product)
}

export function clean(restClient) {
    if (restClient === AXIOS) return rest.delete('/cart/list')
    else return restApi_CartClean()
}

async function restApi_CartAdd(product) {
    const res = await fetch(host + '/cart/add', post('{ "item": ' + JSON.stringify(product) + '}'));
    return await res.json();
}

async function restApi_CartClean() {
    const res = await fetch(host + '/cart/list', deleteConfig);
    return await res.json();
}

async function restApi_CartList() {
    const res = await fetch(host + '/cart/list', getConfig)
    return await res.json();
}

