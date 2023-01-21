import { Alert } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Confirmed = () => {
    const navigate = useNavigate()
    const toSignIn = () => {
        navigate("/login", { state: { value: true } })
    }
    return (
        <div>
            <div className="container c-mt min-h-screen m-auto">
                <div className="flex justify-center gap-60 items-center pt-40">
                    <img className="" src="../files/Confirmed.gif" alt="" />
                    <div className='flex flex-col gap-20'>
                        <h1 className='text-5xl  animate__animated animate__slideInLeft'>Email Confirmed</h1>
                        <span className=' border-b-2 border-gray-400 w-[600px] mt-[-40px]'></span>
                        <span className='mt-[-60px] animate__animated animate__fadeIn'><Alert variant="filled" severity="success">
                            You are all done!
                        </Alert></span>
                        <p className='mb-[-60px] animate__animated animate__fadeIn'>Please login ...</p>
                        <span className='animate__animated animate__slideInRight'><span onClick={() => { toSignIn() }} className='shadow-lg text-xl bg-gradient-to-tr from-indigo-800 via-cyan-500 to-indigo-800 button-custom transition-all hover:tracking-[2px] btn border-none text-white px-20'>Login</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confirmed;
