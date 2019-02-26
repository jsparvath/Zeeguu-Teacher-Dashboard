import React, { useEffect, useState } from 'react'
import { getCohortsInfo } from '../api/api_endpoints'

const CohortItem = () => <div>Cohort Item</div>

const HomeTemplate = ({ cohorts }) => (
  <div>
    {cohorts.map(cohort => (
      <div key={cohort.id}>
        <CohortItem />
      </div>
    ))}
  </div>
)

const Home = () => {
  const [cohorts, setCohortsInfo] = useState(null)

  useEffect(() => {
    getCohortsInfo().then(({ data }) => {
      console.log(data)
      setCohortsInfo(data)
    })
  }, [])

  if (!cohorts) return <p>Loading!!</p>
  return (
    <div>
      <HomeTemplate cohorts={cohorts} />
    </div>
  )
}

export default Home
