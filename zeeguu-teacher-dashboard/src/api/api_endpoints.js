import axios from 'axios'
import universalCookies from 'universal-cookie'

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_ZEEGUU_API_ENDPOINT_PROD
    : process.env.REACT_APP_ZEEGUU_API_ENDPOINT_DEV

export function getCohortsInfo() {
  const GET_COHORTS_INFO = BASE_URL + '/cohorts_info'
  return _apiGet(GET_COHORTS_INFO)
}

export function createCohort(data) {
  const CREATE_COHORT = BASE_URL + '/create_own_cohort'
  return _apiPost(CREATE_COHORT, data)
}

export function deleteCohort(id) {
  const DELETE_COHORT = BASE_URL + `/remove_cohort/${id}`
  return _apiPost(DELETE_COHORT, id)
}
export function updateCohort(data, id) {
  const EDIT_COHORT = BASE_URL + `/update_cohort/${id}`
  return _apiPost(EDIT_COHORT, data)
}

const setParams = () => {
  const cookies = new universalCookies()
  return {
    session: cookies.get('sessionID')
  }
}

async function _apiGet(endpoint) {
  const params = setParams()
  const res = await axios.get(endpoint, { params })
  // console.log(res)
  return res
}

async function _apiPost(endpoint, data) {
  const params = setParams()
  const headers = {
    'Content-Type': 'multipart/form-data'
  }
  console.log('data in post', data)

  const res = await axios({
    method: 'post',
    url: endpoint,
    params: params,
    headers: headers,
    data: data
  })

  return res
}
