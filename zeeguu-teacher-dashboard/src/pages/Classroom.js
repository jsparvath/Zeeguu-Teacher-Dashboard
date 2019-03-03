import React, { useEffect, useContext, useState } from 'react'
import './classroom.scss'
import { getGeneralCohortInfo, getStudents } from '../api/api_endpoints'
import ClassContext from '../ClassContext'
import AddEditClassButton from '../components/AddEditClassButton'
import { EditClass } from '../components/EditClass'

function getLearningProportion(reading_time, exercises_done) {
  if (!(reading_time === 0 && exercises_done === 0)) {
    return (100 * reading_time) / (exercises_done + reading_time)
  } else if (reading_time === 0 && exercises_done === 0) {
    return 0
  } else if (reading_time === 0) {
    return 0
  } else {
    return 100
  }
}

function addTotalAndNormalizedTime(student, maxActivity) {
  if (maxActivity > 0) {
    return {
      ...student,
      normalized_activity_proportion: (student.total_time / maxActivity) * 100
    }
  } else {
    return student
  }
}

function transformStudents(students) {
  let maxActivity = 0
  let transformedStudents = students.map(student => {
    const { reading_time, exercises_done } = student
    const learning_proportion = getLearningProportion(
      reading_time,
      exercises_done
    )
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
const ClassroomTemplate = ({ cohortName, cohortCode, students }) => (
  <div className="page-classroom">
    Class Name: {cohortName} Class code: {cohortCode}
    {/* 
    No table element is used because that each row is a link. 
    implementing that functionality with table is very complex, and also bad for accessibility reasons. 
    Therefore an unordered list is used
    */}
    <div className="ztd-student-table--header">
      <p>NAME</p>
      <p>TIME SPENT</p>
      <p>ACTIVITY</p>
    </div>
    <ul>
      {students.map(student => {
        return (
          <li className="ztd-student-table--item" key={student.id}>
            <a className="ztd-student-table--link" href="#">
              <p>{student.name}</p>
              <p>
                {student.total_time / 3600}h {(student.total_time / 60) % 60}m
              </p>
              {/* Vj {{ ((student.exercises_done + student.reading_time)/3600)|int }} h
                                {{ (((student.exercises_done + student.reading_time)/60)%60)|int }} m */}
              <p>{student.learning_proportion}</p>
            </a>
          </li>
        )
      })}
    </ul>
  </div>
)
const Classroom = ({ classId }) => {
  const [cohortInfo, setCohortInfo] = useState([])
  const [students, setStudents] = useState([])

  const test = useContext(ClassContext)
  const cohort = test.activeClass
  console.log('cohort', cohort)

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
