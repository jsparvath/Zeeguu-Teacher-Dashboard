import axios from 'axios'
import universalCookies from 'universal-cookie'
import { transformStudents } from '../utilities/helpers'

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_ZEEGUU_API_ENDPOINT_PROD
    : process.env.REACT_APP_ZEEGUU_API_ENDPOINT_DEV

export function getCohortsInfo() {
  const GET_COHORTS_INFO = BASE_URL + '/cohorts_info'
  return _apiGet(GET_COHORTS_INFO)
}

export async function getUsersByTeacher(duration) {
  const GET_USERS_BY_TEACHER = BASE_URL + '/users_by_teacher/' + duration
  const result = _apiGet(GET_USERS_BY_TEACHER).then(({ data }) =>
    transformStudents(data)
  )
  return result
}

export function getGeneralCohortInfo(classId) {
  const GET_GENERAL_COHORTS_INFO = BASE_URL + '/cohort_info/' + classId
  return _apiGet(GET_GENERAL_COHORTS_INFO)
}

export function getStudents(classId, duration) {
  const GET_STUDENTS =
    BASE_URL + '/users_from_cohort/' + classId + '/' + duration
  const result = _apiGet(GET_STUDENTS).then(({ data }) =>
    transformStudents(data)
  )
  return result
}
// export function loadUserData(userId, duration)

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
  return res
}

async function _apiPost(endpoint, data) {
  const params = setParams()
  const headers = {
    'Content-Type': 'multipart/form-data'
  }

  const res = await axios({
    method: 'post',
    url: endpoint,
    params: params,
    headers: headers,
    data: data
  })

  return res
}
