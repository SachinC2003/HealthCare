'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';

function PasskeyModel({ otp, id }: { otp: string, id: string }) {
    const [open, setOpen] = useState(true);
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const validatePasskey = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        let apiEndpoint = "/api/login"; // Default API endpoint

        // Check the current route and adjust the API endpoint accordingly
        if (!window.location.pathname.includes("hospitals/login")) {
            apiEndpoint = "/api/hospitallogin";
        }

        if (passkey === otp) {
            try {
                // Assuming you have an API endpoint to log in the user after OTP validation
                const response = await axios.post(`http://localhost:3000${apiEndpoint}`, { id:id });
                if (response.status === 200) {
                    // Store authentication token or update session if needed
                    const { token } = response.data;
                    localStorage.setItem('authToken', token);
                    // Redirect to the patient info page
                    if(apiEndpoint == "/api/hospitallogin"){
                        router.push(`/hospitals/${id}/dashboard`);
                        toast.success("Login successeffuly");
                    }else{
                        router.push(`/patients/${id}/dashboard`);
                        toast.success("Login successeffuly");
                    }
                    setOpen(false);
                } else {
                    toast.error("Failed to login. Please try again.");
                    setError('Failed to login. Please try again.');
                }
            } catch (err) {
                setError('Failed to login. Please try again.');
            }
        } else {
            setError('Invalid OTP. Please try again.');
        }
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className='shad-alert-dialog'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex items-start justify-between'>
                        Admin access verification
                        <Image
                            src='/accests/icons/cross.png'
                            alt='close'
                            width={20}
                            height={20}
                            onClick={closeModal}
                            className='cursor-pointer'
                        />
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        To access the admin page, please enter the OTP sent to your phone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                    <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
                        <InputOTPGroup className='shad-otp'>
                            {[...Array(6)].map((_, index) => (
                                <InputOTPSlot key={index} className="shad-otp-slot" index={index} />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                    {error && <p className='shad-error text-14-regular mt-4 flex justify-center'>{error}</p>}
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={validatePasskey} className='shad-primary-btn w-full'>
                        Enter OTP
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default PasskeyModel;


