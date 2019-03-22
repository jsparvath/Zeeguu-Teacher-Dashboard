import { apiGet, apiPost } from './apiEndpoints'

export function getFiles(classId) {
  const result = apiGet(`GET FILES ENDPOINT/${classId}`)
  return result
}

export function uploadFiles(data) {
  return apiPost('UPLOAD FILES ENDPOINT', data)
}
