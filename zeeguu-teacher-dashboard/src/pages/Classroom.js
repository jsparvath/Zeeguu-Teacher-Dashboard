import React, { useContext } from 'react'
import ClassContext from '../ClassContext'
import AddEditClassButton from '../components/AddEditClassButton'
import { EditClass } from '../components/EditClass'

// const ClassroomTemplate = ({ cohortName, cohortCode }) => (
//   <div>
//     Class Name: {cohortName} Class code: {cohortCode}
//   </div>
// )
const Classroom = () => {
  const test = useContext(ClassContext)
  const cohort = test.activeClass
  console.log('cohort', cohort)
  return (
    <div>
      I am the classroom with id {cohort.id} and name: {cohort.name}
      <AddEditClassButton text="Edit class">
        {closemodal => <EditClass closemodal={closemodal} />}
      </AddEditClassButton>
    </div>
  )
}

export default Classroom
