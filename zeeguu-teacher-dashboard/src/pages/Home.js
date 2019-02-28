import React, { useEffect, useState } from 'react'
import { getCohortsInfo } from '../api/api_endpoints'
import CreateClass from '../components/CreateClass'
import Button from '../components/ui/Button'
import { MdPeople } from 'react-icons/md/'

import './Home.scss'

const CohortItem = ({ cohort }) => (
  <div className="cohort-card">
    <div>
      <p>{cohort.language_name}</p>
      <p className="special">
        {cohort.cur_students}/{cohort.max_students}{' '}
        <MdPeople className="cohort-card-people-icon" size="26px" />
      </p>
    </div>
    <h2 className="cohort-card-headline">{cohort.name}</h2>
    <div>
      <p className="font-light">invite code: {cohort.inv_code}</p>
      {/* <a href="#">View class </a> */}
      <Button
        rounded
        onClick={() => alert('clicked')}
      >
        View class
      </Button>
    </div>
  </div>
)

const HomeTemplate = ({ cohorts }) => (
  <div className="page-home">
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
