'use client'
import React from 'react'

function HomePage() {
    const userData = JSON.parse(localStorage.getItem('userInfo'))
    console.log("userData/", userData)
    return (
        <div>Hey, Welcome {userData?.email} </div>
    )
}

export default HomePage