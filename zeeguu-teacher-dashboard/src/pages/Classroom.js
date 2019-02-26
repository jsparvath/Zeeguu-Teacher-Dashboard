import React from 'react'

const ClassroomTemplate = ({ cohortName, cohortCode }) => (
  <div>
    Class Name: {cohortName} Class code: {cohortCode}
  </div>
)
const Classroom = ({ classId }) => {
  return (
    <div>
      I am the classroom with id {classId}
      <ClassroomTemplate cohortName="Spanish 2019" cohortCode="josn" />
    </div>
  )
}

export default Classroom

