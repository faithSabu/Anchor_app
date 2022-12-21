import React, { useState } from 'react'
import axiosInstance from '../../config/baseUrl';
import { useContext } from 'react';
import testContext from '../../context/testContext';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    let contextSample = useContext(testContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loginErr, setLoginErr] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosInstance.post('/login', {
            email, password
        }).then(response => {
            console.log(response.data);
            if (response.data.invalidUser) setLoginErr(true)
            if (response.data.user) {
                localStorage.setItem("isAuthenticated", "true");
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("jwtToken", response.data.accessToken);
                // axiosInstance.defaults.headers.common['authorization'] = `Bearer ${response.data.accessToken}` 
                navigate('/')
            }
        })
    }


    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <h1 className="logoAnchor flex items-center mt-36 mb-6 text-6xl font-semibold text-gray-900 dark:text-white">
                        Anchor
                    </h1>
                    <div className="w-full bg-white border border-gray-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Log in with Anchor
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    {/* <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label> */}
                                    <input type="email" name="email" id="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            setLoginErr(false)
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder='Your Email' />
                                </div>

                                <div>
                                    {/* <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label> */}
                                    <input type="password" name="password" id="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            setLoginErr(false)
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Password" />
                                </div>

                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                                {loginErr && <small className='text-red-600'>Invalid Username or Password</small>}
                                <div className='flex justify-center'>
                                    <Link to='/signup'>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 cursor-pointer hover:underline">
                                            Don't have an account yet? <span href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign Up</span>
                                        </p>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login