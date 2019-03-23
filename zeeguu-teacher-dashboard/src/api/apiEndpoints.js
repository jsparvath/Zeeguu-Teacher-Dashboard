import axios from 'axios'
import universalCookies from 'universal-cookie'

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_ZEEGUU_API_ENDPOINT_PROD
    : process.env.REACT_APP_ZEEGUU_API_ENDPOINT_DEV

const setParams = () => {
  const cookies = new universalCookies()
  return {
    session: cookies.get('sessionID')
  }
}

export async function apiGet(endpoint) {
  const params = setParams()
  const res = await axios.get(BASE_URL + endpoint, { params })
  return res
}

export async function apiPost(endpoint, data, isForm) {
  const params = setParams()

  const headers = isForm
    ? { 'Content-Type': 'multipart/form-data' }
    : { 'Content-Type': 'appliation/json' }

  const res = await axios({
    method: 'post',
    url: BASE_URL + endpoint,
    params: params,
    headers: headers,
    data: data
  })

  return res
}
