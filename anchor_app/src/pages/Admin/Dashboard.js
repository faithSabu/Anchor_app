

import React from 'react'
import Navbar from '../../components/Admin/Navbar'
import Sidebar from '../../components/Admin/Sidebar'
import Table from '../../components/Admin/Table'

function Dashboard() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='pt-16 lg:pl-64 min-h-screen flex justify-center bg-[#fafafa]'>
        <Table />
      </div>
    </>
  )
}

export default Dashboard