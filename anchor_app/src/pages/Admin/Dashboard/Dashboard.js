

import React from 'react'
import Navbar from '../../../components/Admin/Navbar'
import Sidebar from '../../../components/Admin/Sidebar'

function Dashboard() {
  return (
    <div className='relative'>
      <Navbar/>
      <div className='flex'>
      <Sidebar/>
      </div>
    </div>
  )
}

export default Dashboard