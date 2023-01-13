import React from 'react'
import BlockedPostsTable from '../../components/Admin/BlockedPostsTable'
import Navbar from '../../components/Admin/Navbar'
import Sidebar from '../../components/Admin/Sidebar'

function BlockedPosts() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='pt-16 lg:pl-64 min-h-screen flex justify-center bg-[#fafafa]'>
        <BlockedPostsTable />
      </div>
    </>
  )
}

export default BlockedPosts