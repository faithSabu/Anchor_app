import '../../assets/stylesheets/user/Navbar.css'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch, AiOutlineCloseCircle } from 'react-icons/ai'
import { BiUserCircle, BiBell, BiMessageRounded } from 'react-icons/bi'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getAllUsers } from '../../api/UserRequests'

function Navbar() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [allUsers, setAllUsers] = useState([])
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    try {
      const getallUsersfn = async () => {
        let { data } = await getAllUsers()
        setAllUsers(data)
      }
      getallUsersfn()
    } catch (error) {
      navigate('/error')
    }
  }, [])

  const handleFilter = (e) => {
    const searchWord = e.target.value
    const newFilter = allUsers.filter(value => (
      value.name.toLowerCase().includes(searchWord.toLowerCase()) || value.username.toLowerCase().includes(searchWord.toLowerCase())
    ))
    { searchWord === '' ? setFilteredData([]) : setFilteredData(newFilter) }
  }

  return (
    <div className='nbod1 w-screen h-16 flex bg-white px-8 items-center justify-between fixed z-10'>
      {/* bg-[#f0f2f5] */}
      <div className='flex justify-between items-center gap-10'>
        <Link to='/'><div className='logoAnchor text-4xl text-gray-800'>Anchor</div></Link>
        <div className='flex items-center relative'>
          <div className='flex items-center w-full h-full'>
            <input value={search} id='search' onChange={(e) => {
              setSearch(e.target.value)
              handleFilter(e)
            }} type="" placeholder={`Search Anchor...`} style={{ outline: 'none' }} className='flex justify-center pl-6 py-2 border border-r-0 rounded-l-full' autoComplete="off" />

            <label htmlFor="search" className='rounded-r-full border border-l-0 bg-white w-full h-full px-3 py-2'>
              {search.length ?
                <AiOutlineCloseCircle className='text-2xl ' onClick={()=>{
                  setSearch('')
                  setFilteredData([])
                }}/>
                :
                <AiOutlineSearch className='text-2xl' />
              }
            </label>
          </div>

          {filteredData.length != 0 &&
            <div className='dataResult fixed top-14 bg-white max-h-[80vh] border rounded-lg w-[350px]' >
              {filteredData.slice(0, 10).map(value => (
                <div onClick={()=>{
                  navigate('/userprofile',{state:{ userId: value._id }})
                }} className='dataItem h-14 flex gap-10 items-center px-3 hover:bg-gray-200 cursor-pointer' >
                  <img className='w-10 h-10 rounded-full outline outline-offset-2 outline-2 outline-[#0e1efb] cursor-pointer' src={value.profileImg} alt="" />
                  <span>{value.name}</span>
                  <span className='text-blue-400'>{value.username}</span>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
      <div className=''>

      </div>
      <div>
        <div className='flex gap-4'>
          <NavLink to='/'> <div className='bg-gray-200 p-2 hovertext left-0' data-hover='Messages' style={{ borderRadius: '50%' }}><BiMessageRounded className='text-3xl' /></div></NavLink>
          <NavLink to='/notifications'><div className='bg-gray-200 p-2 hovertext' data-hover='Notifications' style={{ borderRadius: '50%' }}><BiBell className='text-3xl' /></div></NavLink>
          <NavLink to='/profile'> <div className='bg-gray-200 p-2 hovertext' data-hover='Profile' style={{ borderRadius: '50%' }}><BiUserCircle className='text-3xl' /></div></NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar