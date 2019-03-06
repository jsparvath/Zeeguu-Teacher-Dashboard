import React, { useEffect, useState } from 'react'

import { Link } from '@reach/router'
import { getCohortsInfo, getUsersByTeacher } from '../api/api_endpoints'

import { MdPeople, MdArrowForward, MdAddCircle } from 'react-icons/md/'
import './Home.scss'

import { Dialog, DialogContent, Button } from '@material-ui/core'
import ClassForm from '../components/ClassForm'

import ListTable from '../components/ui/ListTable'

import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

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

const CohortsTemplate = ({ cohorts }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="page-home">
      {/* <AppBar
        style={{
          position: 'relative',
          width: 'fit-content',
          backgroundColor: 'red'
        }}
      > */}

      {/* </AppBar> */}
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

const StudentList = ({ students }) => {
  const headItems = [
    {
      width: 25,
      isSortable: true,
      content: <p>NAME</p>
    },
    {
      width: 25,
      isSortable: true,
      content: <p>TIME SPENT</p>
    },
    {
      width: 50,
      isSortable: false,
      content: <p>ACTIVITY</p>
    }
  ]

  const bodyItems = students.map(student => ({
    data: [
      {
        sortingValue: student.name,
        sortingType: 'string',
        content: <p>{student.name}</p>
      },
      {
        sortingValue: student.total_time,
        sortingType: 'number',
        content: (
          <p>
            {student.total_time / 3600}h {(student.total_time / 60) % 60}m
          </p>
        )
      },
      {
        content: <p>{student.learning_proportion}</p>
      }
    ],
    renderComponent: props => <Link to={'student/' + student.id} {...props} />
  }))
  return <ListTable headItems={headItems} bodyItems={bodyItems} />
}

const Home = () => {
  const [cohorts, setCohortsInfo] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTag] = useState(0)
  const [allStudents, setAllStudents] = useState([])

  useEffect(() => {
    getUsersByTeacher(199).then(students => {
      setAllStudents(students)
    })
  }, [])

  useEffect(() => {
    getCohortsInfo().then(({ data }) => {
      setCohortsInfo(data)
    })
  }, [])

  const handleChange = (event, value) => {
    setActiveTag(value)
  }

  // can be used to add a newly created cohort to the list without refreshing
  // might not be smart though - needs testing
  // function addCohort(cohort) {
  //   setCohortsInfo([...cohorts, cohort])
  // }

  return (
    <div>
      <Tabs
        // style={{  }}
        value={activeTab}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab label="CLASSES" />
        <Tab label="STUDENTS" />
      </Tabs>
      {activeTab === 0 && <CohortsTemplate cohorts={cohorts} />}
      {activeTab === 1 && <StudentList students={allStudents} />}
      {/* {cohorts.length ? <HomeTemplate cohorts={cohorts} /> : <p>Loading</p>} */}
    </div>
  )
}

export default Home
