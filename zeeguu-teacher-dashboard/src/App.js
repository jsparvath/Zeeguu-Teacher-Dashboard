import React, { useState } from 'react'
import { Router, Link } from '@reach/router'

import Home from './pages/Home'
// import LoginPage from './pages/LoginPage'
import Classroom from './pages/Classroom'
import StudentActivity from './pages/StudentActivity'
import ClassContext from './ClassContext'

// import logo from './logo.svg'
import './App.scss'

const Nav = () => (
  <div>
    <Link to="/">Go to Home</Link>
    <Link to="/login">Login</Link>
    {/* <Link to="/classroom/70">Go to classroom page</Link> */}
    <Link to="/studentactivity">Go to studentactivity page</Link>
  </div>
)

const App = () => {
  const [activeClass, setActiveClass] = useState(null)
  return (
    <ClassContext.Provider value={{ activeClass, setActiveClass }}>
      <div className="App">
        {activeClass && <p>Current active class name: {activeClass.name}</p>}
        <Nav />
        <Router>
          <Home path="/" />
          {/* <LoginPage path="/login" /> */}
          <Classroom path="classroom/:classId" />
          <StudentActivity path="studentactivity" />
        </Router>
      </div>
    </ClassContext.Provider>
  )
}

export default App
