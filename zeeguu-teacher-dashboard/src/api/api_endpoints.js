const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_ZEEGUU_API_ENDPOINT_PROD
    : process.env.REACT_APP_ZEEGUU_API_ENDPOINT_DEV

export const GET_COHORTS_INFO = BASE_URL + '/cohorts_info'
