import React from 'react'
import { Link } from '@reach/router'

import Logo from '../assets/images/logo.png'

import './nav.scss'

const Nav = () => (
  <nav>
    <Link to="/">
      <img src={Logo} alt="" className="logo" />
      <p className="link-text"> Zeeguu Teacher Dashboard</p>
    </Link>
    <Link to="/">
      <p className="link-text"> Student activity page</p>
    </Link>
  </nav>
)

export default Nav
