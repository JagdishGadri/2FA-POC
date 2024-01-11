'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const HomePage = () => {
    const router = useRouter()
    const [loggedInUserData, setLoggedInUserData] = useState({})


    useEffect(() => {
        if (typeof window !== "undefined") {
            // Check if user is already logged in
            const userData = JSON.parse(localStorage.getItem("userInfo"));
            setLoggedInUserData(userData)
            if (!userData) {
                router.push('/')
            }
        }
    }, [])


    const logoutUser = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem('userInfo')
        }
        router.push('/')
    }


    return (
        <div className='flex justify-center flex-col items-center gap-10  pt-[150px]'>

            <div className=' flex  align-middle justify-center'>
                <p className='decoration-2 text-fuchsia-600 text-3xl'>Hey, Welcome {loggedInUserData?.email}</p>
            </div>
            <div className=' flex  align-middle justify-center  '>
                <p className='text-violet-600 text-xl'>This page is secured with 2 factor authentication.</p>
            </div>
            <button
                className=" bg-blue-500 hover:bg-blue-700 text-white border p-2 rounded-lg w-[200px]  "
                onClick={logoutUser}
            >
                Logout
            </button>
        </div>

    )
}

export default HomePage