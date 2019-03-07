import React from 'react'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core'
import { MdExpandMore } from 'react-icons/md/'

import './studentPage.scss'
const StudentActivity = () => {
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
