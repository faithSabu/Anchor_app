import React, { useContext, useEffect } from 'react'
import Navbar from '../../components/User/Navbar'
import Newsfeed from '../../components/User/Newsfeed'
import Sidebar from '../../components/User/Sidebar'
import { modalContext } from '../../context/Context'

function Home() {

  return (
    <>
      <Navbar/>
      <Sidebar/>
      <div className='pt-16 pl-64 min-h-screen flex justify-center bg-[#fafafa]'>
       <Newsfeed/>
      </div>
    </>
  )
}

export default Home