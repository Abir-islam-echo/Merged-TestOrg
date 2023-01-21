import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import Swal from 'sweetalert2';

const Timer = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const { room } = state;
    let startTime = new Date(`${room.startTime}`).getTime();
    // let endTime = new Date(`${room.endTime}`).getTime();
    let currentTime = new Date().getTime();
    const expiryTimestamp = new Date();
    const remainingTime = (time) => {
        // console.log(time)
        expiryTimestamp.setTime(expiryTimestamp.getTime() + time);
    }
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
    } = useTimer({
        expiryTimestamp, onExpire: () => {
            navigate('/Student/Exam', { state: { room: room } });
        },
    });
    remainingTime(startTime - currentTime)
    return (
        <div className='m-auto min-h-screen py-20'>
            <div className='flex container items-center m-auto justify-between lg:pt-28 flex-col-reverse lg:flex-row gap-10 lg:gap-0'>
                <div className='image-wrapper'>
                    <img className='m-auto' src='../files/wait_exam.gif'></img>
                </div>
                <div className=''>
                    <div>
                        <h1 className="text-2xl font-bold pb-20 text-gray-700">Exam will start after</h1>
                    </div>
                    <div className="flex justify-center gap-5 text-center auto-cols-max w-full pb-5">
                        <div className='nb-custom bg-gradient-to-tr from-indigo-700 via-cyan-500 to-indigo-700 rounded-lg px-6 py-4'>
                            <span className="countdown font-mono md:text-8xl text-gray-50 text-4xl">
                                <span style={{ "--value": days }}></span>
                            </span>
                            <span className='text-gray-100 pl-2'>days</span>
                        </div>
                        <div className='nb-custom bg-gradient-to-tr from-indigo-700 via-cyan-500 to-indigo-700 rounded-lg px-6 py-4'>
                            <span className="countdown font-mono md:text-8xl text-gray-50 text-4xl">
                                <span style={{ "--value": hours }}></span>
                            </span>
                            <span className='text-gray-100 pl-2'>hours</span>
                        </div>
                        <div className='nb-custom bg-gradient-to-tr from-indigo-700 via-cyan-500 to-indigo-700 rounded-lg px-6 py-4'>
                            <span className="countdown font-mono md:text-8xl text-gray-50 text-4xl">
                                <span style={{ "--value": minutes }}></span>
                            </span>
                            <span className='text-gray-100 pl-2'>min</span>
                        </div>
                        <div className='nb-custom bg-gradient-to-tr from-indigo-700 via-cyan-500 to-indigo-700 rounded-lg px-6 py-4'>
                            <span className="countdown font-mono md:text-8xl text-gray-50 text-4xl">
                                <span style={{ "--value": seconds }}></span>
                            </span>
                            <span className='text-gray-100 pl-2'>sec</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Timer