import React from 'react'
import { Link } from 'react-router-dom'
import notFound from '../../assets/Images/404_animation.gif'

function PageNotFound() {
    return (
        <>
            <div className='flex flex-col justify-center items-center py-10'>
                <div className='px-5 '>
                    <span className='text-2xl font-semibold text-center'>Sorry!!! The Requested Page Cannot be Found</span>
                </div>
                <div className='flex justify-center items-center overflow-hidden'>
                    <img className='w-[70vh]' src={notFound} alt="" />
                </div>
                <Link to='/'>
                    <div className='bg-blue-400 px-5 py-2 rounded-full hover:bg-blue-500'>
                        <span className='font-semibold text-xl text-white'>Go To Home</span>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default PageNotFound