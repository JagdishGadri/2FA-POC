'use client'
import React, { useState } from "react";
import QRCode from 'qrcode'
import VerifyQRCode from "./VerifyQRCode";
import { toast } from "react-toastify";

// Get the data URL of the authenticator URL

const LoginForm = () => {
    const [qrCodeSrc, setQrCodeSrc] = useState('')
    const [showVerifyCode, setShowVerifyCode] = useState(false)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [formValues, setFormValues] = useState({ email: '', password: '' })




    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isLoginMode) {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(formValues),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const res = await response.json()

            if (response.status === 200) {
                toast.success("Please enter verification code.");
                // Get the data URL of the authenticator URL
                !res?.userDetails?.isVerified && QRCode.toDataURL(res?.userDetails?.otpAuthURL, (err, data_url) => {

                    // Used to display this data URL to the user in an <img> tag
                    setQrCodeSrc(data_url)
                });
                setShowVerifyCode(true)
            } else {
                toast.error(res.error || 'Something went wrong!');
            }

        } else {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(formValues),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const res = await response.json()

            if (response.status === 200) {
                toast.success("Account created, Please login to proceed further.");
                setIsLoginMode(true)
            } else {
                toast.error(res.error || 'Something went wrong!');
            }
        }
    }



    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white block mx-auto">
                        {isLoginMode ? 'Sign in to your account' : 'Create your account'}
                    </h1>
                    {showVerifyCode ?
                        <VerifyQRCode qrCodeSrc={qrCodeSrc} userEmail={formValues.email} /> :
                        <form className="space-y-4 md:space-y-6" method='post' action="#" onSubmit={(e) => handleSubmit(e)}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your email"
                                    onChange={(e) => setFormValues((prevValues) => { return { ...prevValues, email: e.target.value } })}
                                    value={formValues.email}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) => setFormValues((prevValues) => { return { ...prevValues, password: e.target.value } })}
                                    value={formValues.password}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full border bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-500 hover:bg-blue-700 text-white"
                            >
                                {isLoginMode ? 'Sign in' : 'Create Account'}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                {isLoginMode ? 'Don’t have an account yet?' : 'Already have an account?'}
                                <a
                                    href="#"
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 px-1"
                                    onClick={() => {
                                        setIsLoginMode((prevMode) => {
                                            setFormValues({ email: '', password: '' })
                                            return !prevMode
                                        })
                                    }}
                                >
                                    {isLoginMode ? 'Sign up' : 'Sign in'}
                                </a>
                            </p>

                        </form>
                    }
                </div>
            </div>
        </main>
    );
};

export default LoginForm