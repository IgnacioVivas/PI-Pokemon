import React from 'react'
import { Link } from 'react-router-dom'
import Filters from '../filters/Filters'
import './navBar.scss'

function NavBar() {
    
  return (
    <div id="nav-container">
        <div id='container-span'>
          <Link to={`/create-pokemon`}>
            <span>+ create pokemon</span>
          </Link>
          <span>filters:</span>
        </div>
        
        <Filters/>
    </div>
  )
}

export default NavBar