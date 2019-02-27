import React, { useState } from 'react'

const CreateClass = () => {
  const [cohortName, setCohortName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [languageCode, setLanguageCode] = useState(2)
  const [maxStudents, setMaxStudents] = useState(20)

  const submitForm = e => {
    let data = {
      name: cohortName,
      inv_code: inviteCode,
      language_id: languageCode,
      max_students: maxStudents
    }
    console.log('submitting')
    console.log('current state:', data)
    e.preventDefault()
  }
  return (
    <form onSubmit={submitForm}>
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
        <option value="1">German</option>
        <option value="2">Spanish</option>
        <option value="3">French</option>
        <option value="4">Dutch</option>
        <option value="5">English</option>
      </select>
      <input
        type="number"
        placeholder="Maximum number of students"
        value={maxStudents}
        onChange={e => setMaxStudents(e.target.value)}
        required
      />
      <button type="submit">Create class</button>
    </form>
  )
}

export default CreateClass
