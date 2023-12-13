'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

function HomePage() {
    const userData = JSON.parse(localStorage.getItem('userInfo'))
    const router = useRouter()

    // As part of dummy auth, Checking if the user details exist in Local storage or not 
    if (!userData) {
        router.push('/')
    }
    const logoutUser = () => {
        localStorage.removeItem('userInfo')
        router.push('/')
    }

    return (
        <div className='flex justify-center flex-col items-center gap-10  pt-[150px]'>

            <div className=' flex  align-middle justify-center'>
                <p className='decoration-2 text-fuchsia-600 text-3xl'>Hey, Welcome {userData?.email}</p>
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