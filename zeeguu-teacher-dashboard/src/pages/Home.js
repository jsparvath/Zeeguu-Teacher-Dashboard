import React, { useEffect } from 'react'
import { GET_COHORTS_INFO } from '../api/api_endpoints'
import axios from 'axios'

const HomeTemplate = () => <div>home template</div>
const Home = () => {
  useEffect(() => {
    axios.get(GET_COHORTS_INFO).then(res => {
      console.log(res)
    })
  })

  return (
    <div>
      {GET_COHORTS_INFO}
      <HomeTemplate />
    </div>
  )
}

export default Home
