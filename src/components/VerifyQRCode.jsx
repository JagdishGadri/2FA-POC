import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

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
        setShowQRCode(!res?.isQRCodeScanned)
        if (res.verified) {
            toast.success('User authenticated successfully.')
            localStorage.setItem('userInfo', JSON.stringify(res))
            router.push('/home')
        } else if (res?.error) {
            toast.error(res.error)
        } else {
            toast.error('Incorrect code, Please try again.')
        }
    }

    return (
        <div className='container '>
            {showQRCode && <img className='mx-auto' src={`${qrCodeSrc}`} alt="" />}
            <div >
                <input
                    className="block mx-auto h-8 text-center border border-gray-300 rounded mb-3 "
                    placeholder='Enter 6 digit code here'
                    type='password'
                    onChange={(e) => setEnteredOTP(e.target.value)}
                />
            </div>

            <button
                className='w-full mx-auto p-2 border font-medium rounded-lg bg-blue-500 hover:bg-blue-700 text-white'
                onClick={verifyOTP}
            >Verify</button>
        </div>
    )
}

export default VerifyQRCode