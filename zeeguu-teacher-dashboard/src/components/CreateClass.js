import React, { useState } from 'react'
import { createCohort } from '../api/api_endpoints'
import './createclass.scss'
import Button from './ui/Button'

const CreateClass = () => {
  const [cohortName, setCohortName] = useState('')
  const [inviteCode, setInviteCode] = useState('')
  const [languageCode, setLanguageCode] = useState('es')
  const [maxStudents, setMaxStudents] = useState(20)

  const [errorState, setErrorState] = useState(false)

  const submitForm = e => {
    setErrorState(false)

    const form = new FormData()
    form.append('name', cohortName)
    form.append('inv_code', inviteCode)
    form.append('max_students', maxStudents)
    form.append('language_id', languageCode)

    // let data = {
    //   name: cohortName,
    //   inv_code: inviteCode,
    //   max_students: maxStudents,
    //   language_id: languageCode
    // }
    console.log('submitting')
    console.log('current state:', form)
    createCohort(form)
      .then(res => console.log('RESULT', res))
      .catch(err => setErrorState(true))
    e.preventDefault()
  }
  return (
    <form onSubmit={submitForm} className="ztd-form--createClass">
      <Input
        key="lol"
        type="text"
        placeholder="eg. Spanish 2019"
        label="Name of class"
        value={cohortName}
        setValue={setCohortName}
        required
      />
      <Input
        key="wat"
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
        key="bla"
        type="number"
        placeholder="eg. 25"
        label="Maximum number of students"
        value={maxStudents}
        setValue={setMaxStudents}
        required
      />
      {errorState && <Error />}
      <Button type="submit">Create class</Button>
    </form>
  )
}

const Input = ({ label, value, setValue, ...props }) => {
  return (
    <>
      <label>{label}</label>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        {...props}
      />
    </>
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
