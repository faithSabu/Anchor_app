import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/baseUrl'
import useFormProfileUpdate from '../../hooks/useFormProfileUpdate';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function ProfileInfoUpdation() {

  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString);
  const [userData, setUserData] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const navigate = useNavigate()

  const jwtToken = localStorage.getItem('jwtToken')
  const config = {
    credentials: 'include',
    headers: {
      'Content-Type': "application/json",
      authorization: `Bearer ${jwtToken}`
    },
  }

  useEffect(() => {
    axiosInstance.get(`/profieDetails?userId=${user[0]._id}`,config).then(resp => {
      setUserData(resp.data[0])
    }).catch(()=>navigate('/error'))
  }, [])

  const formLogin = () => {
    axiosInstance.post('/updateProfileInfo', {
      values,
      userId: user[0]._id,
    },config).then(resp => {
      if (resp) {
        resp.data = [resp.data]
        localStorage.setItem("user", JSON.stringify(resp.data));
        Swal.fire({
          title: 'Success!!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        })
      }
    }).catch(()=>navigate('/error'))
  }

  const { handleChange, handleSubmit, formError, errors, values } = useFormProfileUpdate(formLogin)

  return (
    <div>

      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-6 flex">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-44">Name</label>
          <div className='w-full'>
            <input type="text" id="name" name='name'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                handleChange(e)
              }}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder={userData.name && userData.name} />
            {errors.name && <small className='text-red-600'>{errors.name}</small>}
          </div>
        </div>
        <div className="mb-6 flex">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-44">Mobile</label>
          <div className='w-full'>
            <input type="number" id="phone" name='phone'
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                handleChange(e)
              }}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder={userData.phone ? userData.phone : 'Add a phone Number'} />
            {errors.phone && <small className='text-red-600'>{errors.phone}</small>}
          </div>
        </div>
        <div className="mb-6 flex">
          <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-44">Additional Details</label>
          <div className='w-full'>
            <textarea type="text" id="bio" name='bio'
              value={country}
              onChange={(e) => {
                setCountry(e.target.value)
                handleChange(e)
              }}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder={userData.bio ? userData.bio : 'Describe yourself'} />
            {errors.bio && <small className='text-red-600'>{errors.bio}</small>}
          </div>
        </div>

        <button type="submit" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        {formError && <small className='text-red-600'>Please Enter valid Details</small>}
      </form>

    </div>
  )
}

export default ProfileInfoUpdation