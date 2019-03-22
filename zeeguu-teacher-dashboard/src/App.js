import { Router } from '@reach/router'
import React, { useContext, useState } from 'react'
import './App.scss'
import Nav from './components/Nav'
import Classroom from './pages/Classroom'
import Home from './pages/Home'
import StudentPage from './pages/StudentPage'

import TimePeriodContext from './context/TimePeriodContext'

const App = () => {
  const [timePeriod, setTimePeriod] = useState(14)
  return (
    <TimePeriodContext.Provider value={{ timePeriod, setTimePeriod }}>
      <div className="App">
        <Nav />
        <Router>
          <Home path="/" />
          {/* <LoginPage path="/login" /> */}
          <Classroom path="classroom/:classId" />
          <StudentPage path="student/:studentId" />
        </Router>
      </div>
    </TimePeriodContext.Provider>
  )
}

export default App
