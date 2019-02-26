import React, { Component } from 'react'
import { Router, Link } from '@reach/router'

import Home from './pages/Home'
import Classroom from './pages/Classroom'
import StudentActivity from './pages/StudentActivity'

import logo from './logo.svg'
import './App.css'

const Nav = () => (
  <div>
    <Link to="/">Go to Home</Link>
    <Link to="/classroom/70">Go to classroom page</Link>
    <Link to="/studentactivity">Go to studentactivity page</Link>
  </div>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Router>
          <Home path="/" />
          <Classroom path="classroom/:classId" />
          <StudentActivity path="studentactivity" />
        </Router>
      </div>
    )
  }
}

export default App
