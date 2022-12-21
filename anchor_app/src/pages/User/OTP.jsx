import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../config/baseUrl'
import Swal from 'sweetalert2';

function OTP() {
    const [otp, setotp] = useState('')
    const [otpErr, setotpErr] = useState(false)
    const navigate = useNavigate();

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);


    function handleSubmit(e) {
        e.preventDefault();
        axiosInstance.post('/otp', {
            otp
        }).then((resp) => {
            console.log(resp);
            if (!(resp.data.otpValid)) setotpErr(true)
            else {
                Swal.fire({
                    title: 'Your have registered Successfully!!',
                    icon: 'success',
                    text: "Please Login to Continue",
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/')
                    }
                })
            }
        })
    }

    function resendOTP() {
        setMinutes(1);
        setSeconds(30);
        axiosInstance.get('/resendOTP').then(resp => {
            console.log(resp);
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
                            <div className='flex justify-between items-center'>
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Verify OTP
                                </h1>

                                {seconds > 0 || minutes > 0 ? (
                                    <p>
                                        <span className='text-sm'>Resend OTP in</span>  {minutes < 10 ? `0${minutes}` : minutes}:
                                        {seconds < 10 ? `0${seconds}` : seconds}
                                    </p>
                                ) : (
                                    <span className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer mb-2" onClick={resendOTP} >Resend OTP</span>
                                )}

                                {/* <span className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer mb-2" onClick={resendOTP} >Resend OTP</span> */}
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter the OTP sent to your mail</label>
                                    <input type="text" name="otp" id="otp"
                                        value={otp}
                                        onChange={(e) => {
                                            setotp(e.target.value)
                                            setotpErr(false)
                                        }}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder='OTP' required />
                                </div>

                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Verify OTP</button>
                                {otpErr && <small className='text-red-600'>Invalid OTP</small>}
                                <div className='flex  justify-center'>
                                    <Link to='/signup'>
                                        <p className="text-sm font-light text-gray-500 dark:text-gray-400 cursor-pointer hover:underline">
                                            Want to change Email ? <span className="font-medium text-blue-600 hover:underline dark:text-blue-500">Go back</span>
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

export default OTP