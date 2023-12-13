'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import QRCode from 'qrcode'

// Get the data URL of the authenticator URL

const VerifyCode = ({ qrCodeSrc }) => {
    const router = useRouter()
    // const [qrCodeSrc, setQrCodeSrc] = useState('')
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [formValues, setFormValues] = useState({ email: '', password: '' })

    const handleSubmit = async () => {

        if (isLoginMode) {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify(formValues),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const res = await response.json()
            QRCode.toDataURL(res?.userDetails?.qrCodeURL, (err, data_url) => {
                setQrCodeSrc(data_url)
            });
        } else {
            const response = await fetch('/api/register', {
                method: 'POST',
                body: JSON.stringify(formValues),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const res = await response.json()

        }
    }



    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        {isLoginMode ? 'Sign in to your account' : 'Create your account'}
                    </h1>
                    <img src={`${qrCodeSrc}`} alt="" />
                </div>
            </div>
        </main>
    );
};

export default VerifyCode