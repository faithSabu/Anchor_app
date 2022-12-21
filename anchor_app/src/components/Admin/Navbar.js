import '../../assets/stylesheets/user/Navbar.css'
import React from 'react'

function Navbar() {
  return (
        <div className='nbod1 w-screen h-20 flex bg-white justify-between px-8 items-center sticky top-0'>
            {/* bg-[#f0f2f5] */}
            <div className='flex justify-between'>
                <div className='logoAnchor text-4xl'>Anchor</div>
             
            </div>
            <div className='h-auto m-auto'>
               Admin Dashboard
            </div>
            <div>
                Admin Profile
            </div>
        </div>
  )
}

export default Navbar