import React from 'react';
import { useTimer } from 'react-timer-hook';
import Swal from 'sweetalert2';

const ExamTimer = (props) => {
    const { remainingTime, expired, submitResult, setIsFinished } = props
    const expiryTimestamp = new Date();
    expiryTimestamp.setTime(expiryTimestamp.getTime() + remainingTime);

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
    } = useTimer({
        expiryTimestamp, onExpire: () => {
            if (!expired) {
                Swal.fire({
                    icon: 'success',
                    title: 'Good job!',
                    text: 'You can find your result in your room',
                    // html: `<h1><b>You have answred ${answers.length} questions! out of ${questions.length}</b></h1>
                    // <br>
                    // <p className='animate-pulse'>You can find your result in your room</p>`,
                    confirmButtonText: 'Ok',
                })
                Swal.showLoading()
                setTimeout(() => {
                    submitResult();
                }, 3000)
                setIsFinished(true);
            }
        }
    });
    return (
        <div>
            <div className="mb-20 flex justify-center gap-8 text-center auto-cols-max m-auto w-full">
                <div className=''>
                    <span className="countdown font-mono text-5xl text-gray-600">
                        <span style={{ "--value": hours }}></span>
                    </span>
                    <span className='text-gray-500 pl-2'>hours</span>
                </div>
                <div>
                    <span className="countdown font-mono text-5xl text-gray-600">
                        <span style={{ "--value": minutes }}></span>
                    </span>
                    <span className='text-gray-500 pl-2'>min</span>
                </div>
                <div>
                    <span className="countdown font-mono text-5xl text-gray-600">
                        <span style={{ "--value": seconds }}></span>
                    </span>
                    <span className='text-gray-500 pl-2'>sec</span>
                </div>
            </div>

        </div>
    );
}

export default ExamTimer;
