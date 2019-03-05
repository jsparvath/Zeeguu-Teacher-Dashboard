import React, { useEffect, useContext, useState } from 'react'
import './classroom.scss'
import { getGeneralCohortInfo, getStudents } from '../api/api_endpoints'

import { Link } from '@reach/router'
import ClassContext from '../ClassContext'
import AddEditClassButton from '../components/AddEditClassButton'
import { EditClass } from '../components/EditClass'
import { ListTable } from '../components/ui/ListTable'
import { addTotalAndNormalizedTime, getProportion } from '../utilities/helpers'

function transformStudents(students) {
  let maxActivity = 0
  let transformedStudents = students.map(student => {
    const { reading_time, exercises_done } = student
    const learning_proportion = getProportion(reading_time, exercises_done)
    const total_time = reading_time + exercises_done
    maxActivity = maxActivity > total_time ? maxActivity : total_time
    return {
      ...student,
      learning_proportion,
      total_time
    }
  })
  transformedStudents = transformedStudents.map(student =>
    addTotalAndNormalizedTime(student, maxActivity)
  )
  return transformedStudents
}
const ClassroomTemplate = ({ cohortName, cohortCode, students }) => {
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
    renderComponent: props => <Link to="bla" {...props} />
  }))
  return (
    <div className="page-classroom">
      Class Name: {cohortName} Class code: {cohortCode}
      <ListTable headItems={headItems} bodyItems={bodyItems} />
    </div>
  )
}
const Classroom = ({ classId }) => {
  const [cohortInfo, setCohortInfo] = useState([])
  const [students, setStudents] = useState([])

  const test = useContext(ClassContext)
  const cohort = test.activeClass

  useEffect(() => {
    getGeneralCohortInfo(classId).then(({ data }) => {
      setCohortInfo(data)
    })
    getStudents(classId, 9).then(({ data }) => {
      const students = transformStudents(data)
      setStudents(students)
    })
  }, [])

  return (
    <div>
      <AddEditClassButton text="Edit class">
        {closemodal => <EditClass closemodal={closemodal} />}
      </AddEditClassButton>
      I am the classroom with id {classId}
      {students.length === 0 ? (
        <>
          <p> This class has no students</p>
          <p>
            Students can join this class by using the invite code: josn-2019-itu
          </p>
        </>
      ) : (
        <ClassroomTemplate
          students={students}
          cohortName="Spanish 2019"
          cohortCode="josn"
        />
      )}
    </div>
  )
}

export default Classroom
