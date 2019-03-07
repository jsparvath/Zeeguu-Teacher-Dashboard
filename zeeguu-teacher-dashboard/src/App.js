import React, { useState } from 'react'
import { Router } from '@reach/router'

import Home from './pages/Home'
import Classroom from './pages/Classroom'
import StudentPage from './pages/StudentPage'
import Nav from './components/Nav'

import './App.scss'

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Router>
        <Home path="/" />
        {/* <LoginPage path="/login" /> */}
        <Classroom path="classroom/:classId" />
        <StudentPage path="student/:studentId" />
      </Router>
    </div>
  )
}

export default App
