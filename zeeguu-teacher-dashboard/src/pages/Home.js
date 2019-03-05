import React, { useEffect, useState } from 'react'

import { Link } from '@reach/router'
import { getCohortsInfo } from '../api/api_endpoints'

import { MdPeople, MdArrowForward, MdAddCircle } from 'react-icons/md/'
import './Home.scss'

import { Dialog, DialogContent, Button } from '@material-ui/core'
import ClassForm from '../components/ClassForm'

const CohortItem = ({ cohort }) => {
  return (
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
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/classroom/${cohort.id}`}
        >
          View class
          <MdArrowForward className="cohort-card-btn-arrow" size="18px" />
        </Button>{' '}
      </div>
    </div>
  )
}

const HomeTemplate = ({ cohorts }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="page-home">
      <div className="page-home-content">
        {cohorts.map(cohort => (
          <CohortItem key={cohort.id} cohort={cohort} />
        ))}
        <Button
          style={{ minHeight: 200 }}
          color="primary"
          variant="contained"
          onClick={() => setIsOpen(true)}
        >
          <MdAddCircle size="48px" />
        </Button>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <DialogContent>
            {/* <AddClassForm closemodal={() => setIsOpen(false)} /> */}
            <ClassForm
              primaryButtonText="Create Class"
              closemodal={() => setIsOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

const Home = () => {
  const [cohorts, setCohortsInfo] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getCohortsInfo().then(({ data }) => {
      setCohortsInfo(data)
    })
  }, [])

  // can be used to add a newly created cohort to the list without refreshing
  // might not be smart though - needs testing
  // function addCohort(cohort) {
  //   setCohortsInfo([...cohorts, cohort])
  // }

  return (
    <div>
      {cohorts.length ? <HomeTemplate cohorts={cohorts} /> : <p>Loading</p>}
    </div>
  )
}

export default Home
