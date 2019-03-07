import { Button as Buttoooon, Dialog, DialogContent } from '@material-ui/core'
import { Link } from '@reach/router'
import React, { useEffect, useState } from 'react'
import { getGeneralCohortInfo, getStudents } from '../api/apiEndpoints'
import ClassForm from '../components/ClassForm'
import ListTable from '../components/ui/ListTable'
import './classroom.scss'

const ClassroomTemplate = ({ cohort, students }) => {
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
  return (
    <div className="page-classroom">
      Class Name: {cohort.name} Class code: {cohort.code}
      <ListTable headItems={headItems} bodyItems={bodyItems} />
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
    getStudents(classId, 9).then(students => {
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
            {/* <EditClassFrom
              cohort={cohortInfo}
              closemodal={() => setIsOpen(false)}
						/> */}
            <ClassForm
              primaryButtonText="Update Class"
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
        <ClassroomTemplate students={students} cohort={cohortInfo} />
      )}
    </div>
  )
}

export default Classroom
