import React, { useState } from 'react'
import axiosInstance from '../../config/baseUrl';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function ChangePasswordForm() {
  const userString = localStorage.getItem('user')
  const user = JSON.parse(userString);
  const navigate = useNavigate()

  const [newPass, setNewPass] = useState('')
  const [newPassErr, SetNewPassErr] = useState(false)
  const [confirmPassErr, setConfirmPassErr] = useState(false)
  const [incorrectPass, setIncorrectPass] = useState(false)
  const [formErr, setFormErr] = useState(false)

  const jwtToken = localStorage.getItem('jwtToken')
  const config= {
      credentials:'include',
      headers:{
        'Content-Type':"application/json",
        authorization:`Bearer ${jwtToken}` 
      },
    }

  const checkPassword = (e) => {
    axiosInstance.post('/checkPassword', {
      password: e.target.value,
      userId: user[0]._id,
    },config).then(resp => {
      if (!(resp.data)) setIncorrectPass(true)
      else setIncorrectPass(false)
    })
  }

  const handleChange = (e) => {
    if (e.target.value.length < 4) {
      SetNewPassErr(true)
    } else {
      SetNewPassErr(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (incorrectPass || newPassErr || confirmPassErr) return setFormErr(true)
    else setFormErr(false)
    axiosInstance.post('/changePassword', {
      password:newPass,
      userId: user[0]._id,
    },config).then(resp => {
      if(resp.data.updated){
        Swal.fire({
          title: 'Password Changed Successfully!!',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
      }).then((result) => {
          if (result.isConfirmed) {
              navigate('/profile')
          }
      })
      }else{
        alert('Something Error')
      }
    })
  }

  return (
    <>
      <div className="mb-6 flex">
        <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-44">Current password</label>
        <div className='w-full'>
          <input type="password" id="oldPassword" name='password'
            onBlur={checkPassword}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          {incorrectPass && <small className='text-red-600'>Wrong Password</small>}
        </div>
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-6 flex">
          <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-44">New password</label>
          <div className='w-full'>
            <input type="password" id="newPassword" name='password'
              value={newPass}
              onChange={e => {
                setNewPass(e.target.value)
                handleChange(e)
              }}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            {newPassErr && <small className='text-red-600'>Password is not valid</small>}
          </div>
        </div>
        <div className="mb-6 flex">
          <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-44">Confirm password</label>
          <div className='w-full'>
            <input type="password" id="repeat-password"
              onChange={e => {
                if (e.target.value !== newPass) setConfirmPassErr(true)
                else setConfirmPassErr(false)
              }}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            {confirmPassErr && <small className='text-red-600'>Passwords doesn't match</small>}
          </div>
        </div>
        {formErr && <small className='text-red-600'>Invalid Credentials</small>}
        <button type="submit" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

      </form>
    </>
  )
}

export default ChangePasswordForm