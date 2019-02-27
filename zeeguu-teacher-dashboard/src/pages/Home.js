import React, { useEffect, useState } from 'react'
import { getCohortsInfo } from '../api/api_endpoints'
import CreateClass from '../components/CreateClass'

const CohortItem = ({ cohort }) => <div>{cohort.inv_code}</div>

const HomeTemplate = ({ cohorts }) => (
  <div>
    {cohorts.map(cohort => (
      <CohortItem key={cohort.id} cohort={cohort} />
    ))}
  </div>
)

const Home = () => {
  const [cohorts, setCohortsInfo] = useState([])

  useEffect(() => {
    getCohortsInfo().then(({ data }) => {
      console.log(data)
      setCohortsInfo(data)
    })
  }, [])

  if (!cohorts.length) return <p>Loading!!</p>
  return (
    <div>
      <CreateClass />
      <HomeTemplate cohorts={cohorts} />
    </div>
  )
}

export default Home
