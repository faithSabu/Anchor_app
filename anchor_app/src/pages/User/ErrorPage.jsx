import React from 'react'
import { Link } from 'react-router-dom'
import something_went_wrong from '../../assets/Images/something_went_wrong.gif'

function ErrorPage() {
    return (
        <>
            <div className='flex flex-col justify-center items-center py-10'>
                <div>
                    <span className='font-semibold text-2xl'>Oops!!! Something went Wrong</span>
                </div>
                <div className='flex justify-center items-center overflow-hidden h-[60vh]'>
                    <img src={something_went_wrong} alt="" />
                </div>
                <div>
                    <span className='font-semibold text-xl'>Please <Link to='/login'> <span className='underline text-blue-500 hover:text-blue-700 cursor-pointer'>Login</span> </Link> Again</span>
                </div>
            </div>
        </>
    )
}

export default ErrorPage