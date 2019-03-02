import React, { useEffect, useState } from 'react'
import { getGeneralCohortInfo, getStudents } from '../api/api_endpoints'

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
  <div>
    Class Name: {cohortName} Class code: {cohortCode}
    <ul>
      {students.map(student => (
        <li key={student.id}>
          <a href="">
            <h2>{student.name}</h2>
            <p>{student.learning_proportion}</p>
          </a>
        </li>
      ))}
    </ul>
  </div>
)
const Classroom = ({ classId }) => {
  const [cohortInfo, setCohortInfo] = useState([])
  const [students, setStudents] = useState([])

  useEffect(() => {
    getGeneralCohortInfo(classId).then(({ data }) => {
      // console.log(data)
      setCohortInfo(data)
    })
    getStudents(classId, 9).then(({ data }) => {
      const students = transformStudents(data)
      console.log(students)

      setStudents(students)
    })
  }, [])
  return (
    <div>
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
