import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { navigate } from '@reach/router'
import { updateCohort } from '../api/api_endpoints'
import { deleteCohort } from '../api/api_endpoints'

import { SpringSpinner } from 'react-epic-spinners'
import { languageMap } from '../utilities/helpers'

import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@material-ui/core'

const EditClassForm = ({ cohort, closemodal }) => {
  const [errorState, setErrorState] = useState(false)

  const [state, setState] = useState({
    id: cohort.id,
    class_name: cohort.name,
    invite_code: cohort.inv_code,
    language_id: languageMap[cohort.language_name],
    max_students: cohort.max_students,
    labelWidth: 0
  })
  const [isLoading, setIsLoading] = useState(false)
  const inputLabelRef = React.useRef(null)

  React.useEffect(() => {
    setState({
      ...state,
      labelWidth: ReactDOM.findDOMNode(inputLabelRef.current).offsetWidth
    })
  }, [])

  function handleChange(event) {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function submitForm(event) {
    console.log('submitting')
    setErrorState(false)
    setIsLoading(true)
    console.log('current state', state)
    const form = new FormData()
    form.append('name', state.class_name)
    form.append('inv_code', state.invite_code)
    form.append('max_students', state.max_students)
    form.append('language_id', state.language_id)
    updateCohort(form, cohort.id)
      .then(res => {
        console.log('RESULT', res)
        setTimeout(() => closemodal(), 2000)
      })
      .catch(err => setErrorState(true))
    event.preventDefault()
  }

  return (
    <div>
      <form onSubmit={submitForm} style={{ display: 'flex', flexWrap: 'wrap' }}>
        <TextField
          value={state.class_name}
          onChange={handleChange}
          name="class_name"
          id="class_name"
          label="Name of class"
          fullWidth
          type="text"
          required
        />
        <TextField
          value={state.invite_code}
          onChange={handleChange}
          name="invite_code"
          id="invite_code"
          label="Invite Code"
          fullWidth
          type="text"
          required
        />
        <TextField
          value={state.max_students}
          onChange={handleChange}
          name="max_students"
          id="max_students"
          label="Maximum number of students"
          fullWidth
          type="number"
          required
          disabled
        />
        <FormControl fullWidth disabled required style={{ minWidth: 120 }}>
          <InputLabel ref={inputLabelRef} htmlFor="language_id">
            Language
          </InputLabel>
          <Select
            inputProps={{
              name: 'language_id',
              id: 'language_id'
            }}
            value={state.language_id}
            onChange={handleChange}
          >
            <MenuItem value={'de'}>German</MenuItem>
            <MenuItem value={'es'}>Spanish</MenuItem>
            <MenuItem value={'fr'}>French</MenuItem>
            <MenuItem value={'nl'}>Dutch</MenuItem>
            <MenuItem value={'en'}>English</MenuItem>
            <MenuItem value={'it'}>Italian</MenuItem>
            <MenuItem value={'zh-CN'}>Chinese</MenuItem>
          </Select>
        </FormControl>
        {errorState && <Error />}
        <Button
          style={{ marginTop: 10 }}
          type="submit"
          variant="contained"
          color="primary"
        >
          {isLoading ? <SpringSpinner size={24} /> : 'Update class'}
        </Button>
      </form>
      <DangerZone id={cohort.id} />
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

const DangerZone = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  function deleteClass(id) {
    setIsDeleting(true)
    deleteCohort(id)
      .then(() => setTimeout(() => navigate('/'), 2000))
      .catch(err => console.log('failed to delete class', err))
  }

  return (
    <div style={{ marginTop: 60 }}>
      <h3>Danger zone</h3>
      <p>Press the button to delete the class. The class must be empty. </p>
      <Button
        style={{ marginTop: 10 }}
        onClick={() => deleteClass(id)}
        variant="contained"
        color="secondary"
      >
        {isDeleting ? <SpringSpinner size={24} /> : 'Delete Class'}
      </Button>
    </div>
  )
}

export default EditClassForm
