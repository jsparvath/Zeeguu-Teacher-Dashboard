import React, { useEffect, useContext, useState } from 'react'
import './classroom.scss'
import { getGeneralCohortInfo, getStudents } from '../api/api_endpoints'

import { Dialog, DialogContent, Button as Buttoooon } from '@material-ui/core'

import EditClassFrom from '../components/EditClassForm'

import ClassContext from '../ClassContext'
import {
  LTBody,
  LTHead,
  LTHeadItem,
  LTRow,
  LTData,
  ListTable
} from '../components/ui/ListTable'

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
const ClassroomTemplate = ({ cohortName, cohortCode, students }) => {
  const listTable = (
    <ListTable>
      <LTHead items="jo">
        <LTHeadItem width="25" isSortable>
          NAME
        </LTHeadItem>
        <LTHeadItem width="25" isSortable>
          TIME SPENT
        </LTHeadItem>
        <LTHeadItem width="50">ACTIVITY</LTHeadItem>
      </LTHead>
      <LTBody items="jo">
        {students.map(student => (
          <LTRow>
            <LTData sortingValue={student.name} sortingType="string">
              <p>{student.name}</p>
            </LTData>
            <LTData sortingValue={student.total_time} sortingType="number">
              <p>
                {student.total_time / 3600}h {(student.total_time / 60) % 60}m
              </p>
            </LTData>
            <LTData>
              <p>{student.learning_proportion}</p>
            </LTData>
          </LTRow>
        ))}
      </LTBody>
    </ListTable>
  )
  // console.log(listTable)
  return (
    <div className="page-classroom">
      Class Name: {cohortName} Class code: {cohortCode}
      {listTable}
    </div>
  )
}
const Classroom = ({ classId }) => {
  const [cohortInfo, setCohortInfo] = useState([])
  const [students, setStudents] = useState([])
  const [isOpen, setIsOpen] = useState(false)

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
      <h3>{cohortInfo.name}</h3>
      <div>
        <Buttoooon
          color="primary"
          variant="contained"
          onClick={() => setIsOpen(true)}
        >
          Edit class
        </Buttoooon>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <DialogContent>
            <EditClassFrom
              cohort={cohortInfo}
              closemodal={() => setIsOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      I am the classroom with id {classId}
      {students.length === 0 ? (
        <>
          <p> This class has no students</p>
          <p>
            Students can join this class by using the invite code:{' '}
            {cohortInfo.inv_code}
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
