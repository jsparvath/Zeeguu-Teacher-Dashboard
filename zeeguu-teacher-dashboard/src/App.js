import React, { useState } from 'react'
import { Router } from '@reach/router'

import Home from './pages/Home'
// import LoginPage from './pages/LoginPage'
import Classroom from './pages/Classroom'
import StudentActivity from './pages/StudentActivity'
import ClassContext from './ClassContext'
import Nav from './components/Nav'

// import logo from './logo.svg'
import './App.scss'

const App = () => {
  return (
    <div className="App">
      <Nav />
      <Router>
        <Home path="/" />
        {/* <LoginPage path="/login" /> */}
        <Classroom path="classroom/:classId" />
        <StudentActivity path="student/:studentId" />
      </Router>
    </div>
  )
}

export default App
