import axios from 'axios'
import { getConfig } from "../restClient_fetch";
import { AXIOS } from '../RestClientSelector'

const host = 'http://localhost:8081'

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

async function list(search) {
  const res = await fetch(host + '/product/' + (search === '' ? 'list' : 'find/' + search), getConfig)
  return await res.json();
}