import { Router } from '@reach/router'
import React, { useContext, useState } from 'react'
import './App.scss'
import Nav from './components/Nav'
import Classroom from './pages/Classroom'
import Home from './pages/Home'
import StudentPage from './pages/StudentPage'
const TimePeriodContext = React.createContext({
  timePeriod: 14,
  setTimePeriod: () => {}
})

const App = () => {
  const [timePeriod, setTimePeriod] = useState(14)
  return (
    <TimePeriodContext.Provider value={{ timePeriod, setTimePeriod }}>
      <div className="App">
        <Nav />
        <TimePeriodComponent />
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

const TimePeriodComponent = () => {
  const { timePeriod, setTimePeriod } = useContext(TimePeriodContext)
  return (
    // <TimePeriodContext.Consumer>
    <div>
      <button onClick={() => setTimePeriod(30)}>
        Switch Language (Current: {timePeriod})
      </button>
    </div>

    // </TimePeriodContext.Consumer>
  )
}

export default App
