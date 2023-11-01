import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'


function PortalLayout() {
  return (
     <div id="wrapper">
  <div id="content-wrapper" className="d-flex flex-column">
    <div id="content">
    <Navbar/>
      <Outlet/> 
    </div>
  </div>
</div>

  )
}

export default PortalLayout