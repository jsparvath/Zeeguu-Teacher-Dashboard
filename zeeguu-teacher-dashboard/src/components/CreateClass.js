import React, { useState } from 'react'
import { SpringSpinner } from 'react-epic-spinners'
import { createCohort } from '../api/api_endpoints'
import './classform.scss'
import Button from './ui/Button'
import Input from './ui/Input'

const CreateClass = ({ closemodal }) => {
  const [cohortName, setCohortName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [languageCode, setLanguageCode] = useState('es')
  const [maxStudents, setMaxStudents] = useState(20)
  const [isLoading, setIsLoading] = useState(false)

  const [errorState, setErrorState] = useState(false)

  const submitForm = e => {
    setErrorState(false)
    setIsLoading(true)

    const form = new FormData()
    form.append('name', cohortName)
    form.append('inv_code', inviteCode)
    form.append('max_students', maxStudents)
    form.append('language_id', languageCode)

    // use this to manually add the newly created class without refreshing the page
    // const data = {
    //   name: cohortName,
    //   inv_code: inviteCode,
    //   max_students: maxStudents,
    //   language_id: languageCode
    // }
    // console.log('data:', data)
    // add(data)
    console.log('submitting')
    console.log('current state:', form)
    createCohort(form)
      .then(res => {
        console.log('RESULT', res)
        setTimeout(() => closemodal(), 2000)
      })
      .catch(err => setErrorState(true))
    e.preventDefault()
  }
  return (
    <form onSubmit={submitForm} className="ztd-form">
      <Input
        type="text"
        placeholder="eg. Spanish 2019"
        label="Name of class"
        value={cohortName}
        setValue={setCohortName}
        required
      />
      <Input
        type="text"
        placeholder="eg. spa123"
        label="Invite code"
        value={inviteCode}
        setValue={setInviteCode}
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
      <Input
        type="number"
        placeholder="eg. 25"
        label="Maximum number of students"
        value={maxStudents}
        setValue={setMaxStudents}
        required
      />
      {errorState && <Error />}
      <Button
        type="submit"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        {isLoading ? <SpringSpinner size={24} /> : 'Create class'}
      </Button>
    </form>
  )
}

const Error = () => {
  return (
    <p style={{ color: 'red' }}>
      A class with that invite code already exists. Please pick another one.
    </p>
  )
}

export default CreateClass
