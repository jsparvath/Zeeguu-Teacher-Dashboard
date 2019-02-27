import axios from 'axios'
import universalCookies from 'universal-cookie'

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_ZEEGUU_API_ENDPOINT_PROD
    : process.env.REACT_APP_ZEEGUU_API_ENDPOINT_DEV

export const GET_COHORTS_INFO = BASE_URL + '/cohorts_info'

export function getCohortsInfo() {
  return _apiGet(GET_COHORTS_INFO)
}

async function _apiGet(endpoint) {
  const cookies = new universalCookies()
  const params = {
    session: cookies.get('sessionID')
  }
  const res = await axios.get(endpoint, { params })
  // console.log(res)
  return res
}

async function _apiPost(endpoint, data) {
  const cookies = new universalCookies()
  const params = {
    session: cookies.get('sessionID')
  }

  const res = await axios.post(endpoint, data, { params })
}
