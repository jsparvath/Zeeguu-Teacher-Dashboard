import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { MdExpandMore } from 'react-icons/md/'
import { loadUserData } from '../api/apiEndpoints'
import './studentPage.scss'

const StudentActivity = ({ studentId }) => {
  const [studentData, setStudentData] = useState([])
  useEffect(() => {
    loadUserData(studentId, 10).then(result => {
      // console.log(result)
    })
  }, [])
  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
          <h2 className="student-activity-item-heading">
            This is my lucky friend
          </h2>
          <p>another friend</p>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>yoyoyo</ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
          This is my lucky friend
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>yoyoyo</ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
          This is my lucky friend
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>yoyoyo</ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
          This is my lucky friend
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>yoyoyo</ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

export default StudentActivity
