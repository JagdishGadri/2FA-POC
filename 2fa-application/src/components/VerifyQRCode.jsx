import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function VerifyQRCode({ qrCodeSrc, userEmail }) {
    const [enteredOTP, setEnteredOTP] = useState('')
    const [showQRCode, setShowQRCode] = useState(qrCodeSrc)
    const router = useRouter()
    const verifyOTP = async () => {
        const response = await fetch('/api/verify', {
            method: 'POST',
            body: JSON.stringify({ userToken: enteredOTP, email: userEmail }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const res = await response.json()
        console.log("res", res)
        setShowQRCode(!res?.isVerified)
        if (res.verified) {
            localStorage.setItem('userInfo', JSON.stringify(res))
            router.push('/home')
        }
    }

    return (
        <div className='container '>
            {showQRCode && <img className='mx-auto' src={`${qrCodeSrc}`} alt="" />}
            <div >
                <input
                    className="block mx-auto h-8 text-center border border-gray-300 rounded mb-3 "
                    placeholder='Enter 6 digit code here'
                    onChange={(e) => setEnteredOTP(e.target.value)}
                />
            </div>

            <button
                className='w-full mx-auto p-2 border font-medium rounded-lg bg-gray-200 hover:bg-gray-300'
                onClick={verifyOTP}
            >Verify</button>
        </div>
    )
}

export default VerifyQRCode