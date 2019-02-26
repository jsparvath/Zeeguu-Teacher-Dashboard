import React, { useEffect } from 'react'
import { GET_COHORTS_INFO } from '../api/api_endpoints'
import axios from 'axios'

const ApiConnectionTest = props => {
  useEffect(() => {
    axios.get(GET_COHORTS_INFO).then(res => {
      console.log(res)
    })
  })
  return (
    <div>
      This is a test
      {GET_COHORTS_INFO}
    </div>
  )
}

export default ApiConnectionTest
