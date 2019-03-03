import React, { useEffect, useState } from 'react'
import { Link } from '@reach/router'
import { getCohortsInfo } from '../api/api_endpoints'
import CreateClassButton from '../components/CreateClassButton'
import Button from '../components/ui/Button'
import { MdPeople, MdArrowForward } from 'react-icons/md/'

import './Home.scss'

const CohortItem = ({ cohort }) => (
  <div className="cohort-card">
    <div>
      <p>{cohort.language_name}</p>
      <p className="special">
        {cohort.cur_students}/{cohort.max_students}{' '}
        <MdPeople className="cohort-card-icon-people" size="22px" />
      </p>
    </div>
    <h2 className="cohort-card-headline">{cohort.name}</h2>
    <div>
      <p className="font-light">invite code: {cohort.inv_code}</p>
      <Button Component={Link} to={'/classroom/' + cohort.id} rounded>
        <div className="cohort-card-btn-text">
          <span className="font-size-medium">View class </span>
          <MdArrowForward className="cohort-card-btn-arrow" size="24px" />
        </div>
      </Button>
    </div>
  </div>
)

const HomeTemplate = ({ cohorts }) => (
  <div className="page-home">
    <div className="page-home-content">
      {cohorts.map(cohort => (
        <CohortItem key={cohort.id} cohort={cohort} />
      ))}
    </div>
  </div>
)

const Home = () => {
  const [cohorts, setCohortsInfo] = useState([])

  useEffect(() => {
    getCohortsInfo().then(({ data }) => {
      setCohortsInfo(data)
    })
  }, [])

  return (
    <div>
      <CreateClassButton />
      {cohorts.length ? <HomeTemplate cohorts={cohorts} /> : <p>Loading</p>}
    </div>
  )
}

export default Home
