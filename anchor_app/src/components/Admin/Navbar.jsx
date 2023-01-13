import '../../assets/stylesheets/user/Navbar.css'
import { BiUserCircle, BiBell, BiMessageRounded } from 'react-icons/bi'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {



    return (
        <div className='nbod1 w-screen h-16 flex bg-white px-8 items-center justify-between fixed z-10'>
            {/* bg-[#f0f2f5] */}
            <div className='flex justify-between items-center gap-10'>
                <Link to='/'><div className='logoAnchor text-4xl text-gray-800'>Anchor</div></Link>
                {/* <div className='flex items-center relative'>
                    <div className='flex items-center w-full h-full'>
                        <label htmlFor="search" className='rounded-r-full border border-l-0 bg-white w-full h-full px-3 py-2'>
                            <input type="search" />
                        </label>
                    </div>
                </div> */}
            </div>
            {/* <div className=''>
                Admin
            </div> */}
            <div>
                <div className='flex gap-4'>
                </div>
            </div>
        </div>
    )
}

export default Navbar