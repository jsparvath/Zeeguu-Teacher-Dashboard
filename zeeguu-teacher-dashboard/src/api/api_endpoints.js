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

export function getGeneralCohortInfo(classId) {
  const GET_GENERAL_COHORTS_INFO = BASE_URL + '/cohort_info/' + classId
  return _apiGet(GET_GENERAL_COHORTS_INFO)
}

export function getStudents(classId, duration) {
  const GET_STUDENTS =
    BASE_URL + '/users_from_cohort/' + classId + '/' + duration
  return _apiGet(GET_STUDENTS)
}

export function createCohort(data) {
  const CREATE_COHORT = BASE_URL + '/create_own_cohort'
  return _apiPost(CREATE_COHORT, data)
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

  // axios
  //   .post(endpoint, { form: data }, { params })
  //   .then(res => console.log('result', res))
  //   .catch(err => console.log('error', err))
}
