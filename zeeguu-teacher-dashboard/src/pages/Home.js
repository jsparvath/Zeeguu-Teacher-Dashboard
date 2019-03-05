import React, { useEffect, useState, useContext } from 'react'

import { Link } from '@reach/router'
import { getCohortsInfo } from '../api/api_endpoints'

import AddClassForm from '../components/AddClassForm'
import Button from '../components/ui/Button'
import { MdPeople, MdArrowForward } from 'react-icons/md/'
import ClassContext from '../ClassContext'
import './Home.scss'

import { Dialog, DialogContent, Button as Buttoooon } from '@material-ui/core'
import ClassForm from '../components/ClassForm'

const CohortItem = ({ cohort }) => {
  const ctx = useContext(ClassContext)
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
          Component={Link}
          to={`/classroom/${cohort.id}`}
          rounded
          onClick={() => {
            ctx.setActiveClass(cohort)
          }}
        >
          <div className="cohort-card-btn-text">
            <span className="font-size-medium">View class </span>
            <MdArrowForward className="cohort-card-btn-arrow" size="24px" />
          </div>
        </Button>
      </div>
    </div>
  )
}

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
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getCohortsInfo().then(({ data }) => {
      setCohortsInfo(data)
    })
  }, [])

  // can be used to add a newly created cohort to the list without refreshing
  // might not be smart though - needs testing
  // function addCohort(cohort) {
  //   console.log('adding', cohort)
  //   setCohortsInfo([...cohorts, cohort])
  // }

  return (
    <div>
      <Buttoooon
        color="primary"
        variant="contained"
        onClick={() => setIsOpen(true)}
      >
        Create new class
      </Buttoooon>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogContent>
          {/* <AddClassForm closemodal={() => setIsOpen(false)} /> */}
          <ClassForm closemodal={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
      {cohorts.length ? <HomeTemplate cohorts={cohorts} /> : <p>Loading</p>}
    </div>
  )
}

export default Home
