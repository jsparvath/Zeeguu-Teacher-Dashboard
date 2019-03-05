import React, { useState, useContext } from 'react'
import { languageMap } from '../utilities/helpers'
import { navigate } from '@reach/router'
import { SpringSpinner } from 'react-epic-spinners'
import ClassContext from '../ClassContext'
import Button from './ui/Button'
import Input from './ui/Input'
import { updateCohort } from '../api/api_endpoints'
import { deleteCohort } from '../api/api_endpoints'

export const EditClass = ({ closemodal }) => {
  const ctx = useContext(ClassContext)
  const cohort = ctx.activeClass
  const [inviteCode, setInviteCode] = useState(cohort.inv_code)
  const [cohortName, setCohortName] = useState(cohort.name)
  const [languageCode, setLanguageCode] = useState(
    languageMap[cohort.language_name]
  )
  const [maxStudents, setMaxStudents] = useState(cohort.max_students)
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
    updateCohort(form, cohort.id)
      .then(setTimeout(() => closemodal(), 2000))
      .catch(err => setErrorState(true))
    e.preventDefault()
  }
  return (
    <div>
      Editing class: {cohort.name}
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
          disabled
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
          disabled
        />
        {errorState && <Error />}
        <Button
          type="submit"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {isLoading ? <SpringSpinner size={24} /> : 'Update class'}
        </Button>
      </form>
      {/* <form onSubmit={submitForm} className="ztd-form">
        <Input value={cohortName} setValue={setCohortName} />
        <Input value={inviteCode} setValue={setInviteCode} />
        <Button
          type="submit"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          Update
        </Button>
      </form> */}
      <div>
        <h3>Danger zone</h3>
        <p>
          Here you can delete a class. Be careful: there is no going back. The
          class must be empty.
        </p>
        <Button
          className="ztd-btn--danger"
          onClick={() => {
            deleteCohort(cohort.id).then(() => navigate('/'))
          }}
        >
          Delete this class
        </Button>
      </div>
    </div>
  )
}

const Error = () => {
  return (
    <p style={{ color: 'red' }}>
      A class with that invite code already exists. Please pick another one.
    </p>
  )
}
