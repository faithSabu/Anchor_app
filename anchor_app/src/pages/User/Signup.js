import React, { useState } from 'react'
import useForm from '../../hooks/useForm';
import axiosInstance from '../../config/baseUrl';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function Signup() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [emailExist, setEmailExist] = useState('')
    const [usernameExist, setUsernameExist] = useState('')

    const formLogin = () => {
        axiosInstance.post('/signup', {
            email: values.email,
            name: values.name,
            username: values.username,
            password: values.password,
        }).then((response) => {
            console.log(response);
            let registered = true;
            if (response.data.userExist) {
                registered = false;
                setEmailExist('Sorry, Email Already Registered')
            }
            if (response.data.usernameExist) {
                registered = false;
                setUsernameExist('Username Already Taken')
            }
            if (registered) {
                navigate('/otp')
            }
        })
    }

    const { values, errors, formError, handleChange, handleSubmit } = useForm(formLogin)

    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <h1 className="logoAnchor text-6xl flex items-center mb-6 font-semibold text-gray-900 dark:text-white">
                        Anchor
                    </h1>
                    <div className="w-full bg-white border border-gray-300 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account with Anchor
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    {/* <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label> */}
                                    <input type="email" name="email" id="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                            handleChange(e)
                                            setEmailExist('')
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder='Your Email' />
                                    {errors.email && <small className='text-red-600'>{errors.email}</small>}
                                    {emailExist && <small className='text-red-600'>{emailExist}</small>}
                                </div>
                                <div>
                                    {/* <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label> */}
                                    <input type="text" name="name" id="name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                            handleChange(e)
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Full Name" />
                                    {errors.name && <small className='text-red-600'>{errors.name}</small>}
                                </div>
                                <div>
                                    {/* <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label> */}
                                    <input type="text" name="username" id="username"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value)
                                            handleChange(e)
                                            setUsernameExist('')
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="User Name" />
                                    {errors.username && <small className='text-red-600'>{errors.username}</small>}
                                    {usernameExist && <small className='text-red-600'>{usernameExist}</small>}
                                </div>
                                <div>
                                    {/* <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label> */}
                                    <input type="password" name="password" id="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                            handleChange(e)
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Password" />
                                    {errors.password && <small className='text-red-600'>{errors.password}</small>}
                                </div>

                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
                                {formError && <small className='text-red-600'>Please Enter valid Details</small>}
                                <div className='flex justify-center'>
                                    <Link to='/login'>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 cursor-pointer hover:underline">
                                            Already have an account? <span className="font-medium text-blue-600 hover:underline dark:text-blue-500">Sign In</span>
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

export default Signup