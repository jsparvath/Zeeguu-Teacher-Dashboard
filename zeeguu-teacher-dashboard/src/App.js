import { Router } from '@reach/router'
import React from 'react'
import './App.scss'
import Nav from './components/Nav'
import Classroom from './pages/Classroom'
import Home from './pages/Home'
import StudentPage from './pages/StudentPage'

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
