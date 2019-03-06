import React, { useEffect, useState } from 'react'

import { Link } from '@reach/router'
import { getCohortsInfo, getUsersByTeacher } from '../api/api_endpoints'

import './Home.scss'

import CohortsList from '../components/CohortsList'
import ListTable from '../components/ui/ListTable'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

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

function getStudentBodyItems(students) {
  return students.map(student => ({
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
            {Math.floor(student.total_time / 3600)}h{' '}
            {Math.ceil((student.total_time / 60) % 60)}m
          </p>
        )
      },
      {
        content: <p>{student.learning_proportion}</p>
      }
    ],
    renderComponent: props => <Link to={'student/' + student.id} {...props} />
  }))
}

const Home = () => {
  const [cohorts, setCohortsInfo] = useState([])
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
    <div className="page-home">
      <div className="page-home-content">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab label="CLASSES" />
          <Tab label="STUDENTS" />
        </Tabs>
        {activeTab === 0 && <CohortsList cohorts={cohorts} />}
        {activeTab === 1 && (
          <ListTable
            headItems={headItems}
            bodyItems={getStudentBodyItems(allStudents)}
          />
        )}
        {/* {cohorts.length ? <HomeTemplate cohorts={cohorts} /> : <p>Loading</p>} */}
      </div>
    </div>
  )
}

export default Home
