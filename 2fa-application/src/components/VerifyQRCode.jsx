import React, { useState } from 'react'

function VerifyQRCode({ qrCodeSrc, userEmail }) {
    const [enteredOTP, setEnteredOTP] = useState('')
    const [showQRCode, setShowQRCode] = useState(qrCodeSrc)
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
    }

    return (
        <div>
            {showQRCode && <img src={`${qrCodeSrc}`} alt="" />} <><input
                className=" h-8 text-center border border-gray-300 rounded"
                onChange={(e) => setEnteredOTP(e.target.value)}
            />
                <button
                    className='w-full border bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                    onClick={verifyOTP}
                >Verify</button></>

        </div>
    )
}

export default VerifyQRCode