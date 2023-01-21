import React from 'react';
import { Link } from 'react-router-dom';

const Invalid = () => {
    return (
        <div>
            <div className="container c-mt min-h-screen m-auto">
                <div className="flex justify-center gap-60 items-center pt-40">
                    <img className="" src="../files/Oops! 404 Error with a broken robot.gif" alt="" />
                    <div className='flex flex-col gap-20'>
                        <h1 className='text-5xl font-semibold animate__animated animate__slideInLeft'>Page not fond</h1>
                        <span className=' border-b-2 border-gray-400 w-[600px] mt-[-40px]'></span>
                        <span className='animate__animated animate__slideInRight'><Link className=' text-xl bg-gradient-to-tr from-indigo-800 via-cyan-500 to-indigo-800 button-custom transition-all hover:tracking-[2px] btn border-none text-white px-20' to={"/home"}>Go back to Home</Link></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invalid;