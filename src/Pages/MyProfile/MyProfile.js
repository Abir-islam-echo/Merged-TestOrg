import React from 'react';
import useAuth from '../../Hooks/useAuth';

const MyProfile = () => {
    const { validUser } = useAuth()
    return (
        <div className='c-mt container m-auto pb-10 pt-10 min-h-screen'>
            <div>
                <div className='w-full shadow-md rounded-lg p-4 text-start mb-10 border-l-cyan-700 border-l-8'>
                    <h1 className='animate__animated  animate__fadeInRight text-4xl font-semibold '>My Profile</h1>
                </div>
                <div className='flex flex-col items-center lg:flex-row rounded-lg overflow-hidden mt-20 animate__animated  animate__fadeIn gap-5'>
                    <div className='lg:w-1/3 w-full rounded-md overflow-hidden '>
                        <div className=''>
                            <img className='rounded-md ' src='../files/profile.jpg' />
                        </div>
                    </div>
                    <div className='lg:w-2/3 w-full py-0  flex flex-col gap-7'>
                        <div className='flex items-center p-2 border-4 justify-between py-5 border-gray-300 rounded-md'>
                            <span className='w-1/3 text-xl font-semibol text-start'><h2>User Name :</h2></span>
                            <span className='w-2/3 text-xl font-semibold text-start border-l-2 pl-4 border-gray-400'><h2>{validUser?.userName}</h2></span>
                        </div>
                        <div className='flex items-center p-2 border-4 justify-between py-5 border-gray-300 rounded-md'>
                            <span className='w-1/3 text-xl font-semibol text-start'><h2>Mail :</h2></span>
                            <span className='w-2/3 text-xl font-semibold text-start border-l-2 pl-4 border-gray-400'><h2>{validUser?.userMail}</h2></span>
                        </div>
                        <div className='flex items-center p-2 border-4 justify-between py-5 border-gray-300 rounded-md'>
                            <span className='w-1/3 text-xl font-semibol text-start'><h2>Role :</h2></span>
                            <span className='w-2/3 text-xl font-semibold text-start border-l-2 pl-4 border-gray-400'><h2>{validUser?.usertype}</h2></span>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
