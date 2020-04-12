import axios from 'axios'
import { getConfig, putConfig } from "../restClient_fetch";
import { AXIOS } from '../RestClientSelector'

const host = 'http://'+(process.env.REACT_APP_BACK_END_SERVER_IP?process.env.REACT_APP_BACK_END_SERVER_IP:'localhost:8081')

export const rest = axios.create({
  baseURL: host,
  timeout: 2000,
  auth: {
    username: 'user',
    password: 'user'
  },
  withCredentials: true,
})

export function load(restClient, search) {
  if (restClient === AXIOS)
    return rest.get(host + '/product/' + (search === '' ? 'list' : 'find/' + search)).then((res) => res.data)
  else
    return list(search)
}
export function insert(restClient) {
  if (restClient === AXIOS)
    return rest.put(host + '/product/all')
  else
    return insertFetch()
}

async function list(search) {
  const res = await fetch(host + '/product/' + (search === '' ? 'list' : 'find/' + search), getConfig)
  return await res.json();
}
async function insertFetch() {
  const res = await fetch(host + '/product/all', putConfig)
  return await res.json();
}