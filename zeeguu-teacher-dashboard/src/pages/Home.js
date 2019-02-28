import React, { useEffect, useState } from 'react'
import { getCohortsInfo } from '../api/api_endpoints'
import CreateClass from '../components/CreateClass'

import './Home.scss'

const CohortItem = ({ cohort }) => (
  <div className="cohort-card">
    <p>{cohort.language_name}</p>
    <p>
      {cohort.cur_students} / {cohort.max_students}
    </p>

    <h2>{cohort.name}</h2>
    <p>{cohort.inv_code}</p>
    <a href="#">View class ▶️</a>
  </div>
)

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
