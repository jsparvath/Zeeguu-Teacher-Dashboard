import React, { useState } from 'react'
import { createCohort } from '../api/api_endpoints'
import './createclass.scss'
import Button from './ui/Button'

const CreateClass = () => {
  const [cohortName, setCohortName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [languageCode, setLanguageCode] = useState('es')
  const [maxStudents, setMaxStudents] = useState(20)

  const submitForm = e => {
    let data = {
      name: cohortName,
      inv_code: inviteCode,
      max_students: maxStudents,
      language_id: languageCode
    }
    console.log('submitting')
    console.log('current state:', data)
    let res = createCohort(data)
    console.log('res', res)
    e.preventDefault()
  }
  return (
    <form onSubmit={submitForm} className="ztd-form--createClass">
      <input
        type="text"
        placeholder="Name of class"
        value={cohortName}
        onChange={e => setCohortName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Invite code"
        value={inviteCode}
        onChange={e => setInviteCode(e.target.value)}
        required
      />
      <select
        value={languageCode}
        onChange={e => setLanguageCode(e.target.value)}
        required
      >
        <option value="de">German</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="nl">Dutch</option>
        <option value="en">English</option>
        <option value="it">Italian</option>
        <option value="zh-CN">Chinese</option>
      </select>
      <input
        type="number"
        placeholder="Maximum number of students"
        value={maxStudents}
        onChange={e => setMaxStudents(e.target.value)}
        required
      />
      <Button type="submit">Create class</Button>
    </form>
  )
}

export default CreateClass
