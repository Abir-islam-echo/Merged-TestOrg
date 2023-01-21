import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const SingleRoom = (props) => {


    const { validUser } = useAuth()
    const navigate = useNavigate()
    const { room, setRooms } = props;
    const startTime = new Date(`${room.startTime}`).getTime();
    const endTime = new Date(`${room.endTime}`).getTime();
    const currentTime = new Date().getTime();
    const examDays = new Date(endTime).getDay() - new Date(startTime).getDay()
    const examHours = new Date(endTime).getHours() - new Date(startTime).getHours()
    const examMinutes = new Date(endTime - startTime).getMinutes()
    // console.log(examDays, examHours, examMinutes)

    const getStatus = (room) => {
        if (startTime > currentTime) {
            let obj = {
                status: `not starded yet`,
                color: `badge-primary`,
            }
            return obj

        }
        else if (currentTime >= startTime && currentTime < endTime) {
            let obj = {
                status: `running`,
                color: `badge-success`,
                animation: `animate-pulse`

            }
            return obj

        }
        else {
            let obj = {
                status: `ended`,
                color: `badge-ghost`,
            }
            return obj
        }
    }

    const showRoom = () => {
        if (validUser?.usertype == "teacher") {
            Swal.fire({
                icon: 'info',
                text: 'If you want to attend any exam, you will need a student account',
                showCancelButton: true,
                confirmButtonText: 'Exam Details',
            }).then((result) => {
                if (result.isConfirmed) {
                    let timerInterval
                    Swal.fire({
                        text: 'Please wait...',
                        didOpen: () => {
                            Swal.showLoading()
                            timerInterval = setInterval(() => {
                            }, 1000)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    })
                    const sendDetails = async () => {
                        await axios.post(`https://excited-foal-raincoat.cyclic.app/room/view-room`, { token: validUser.token, roomID: room.roomID })
                            .then(response => {
                                navigate('/examDetails', { state: { room: response.data } })

                            })
                            .catch(error => {
                                // console.log(error)
                                Swal.fire({
                                    icon: 'error',
                                    title: 'something went wrong',
                                    text: 'please try again later'
                                })
                            })
                    }
                    sendDetails();
                }
            })
        }

        else {
            if (getStatus(room).status == 'running') {
                Swal.fire({
                    icon: 'success',
                    title: 'This exam is already running',
                    showCancelButton: true,
                    confirmButtonText: 'Continue examining',
                }).then((result) => {
                    if (result.isConfirmed) {

                        if (room.participated) {
                            Swal.fire({
                                icon: "error",
                                title: "access denied !!",
                                text: "You have already participated in this exam, you will get your result at the end of this exam",
                                showConfirmButton: true,
                                confirmButtonText: "ok"
                            })
                        }
                        else {
                            let timerInterval
                            Swal.fire({
                                text: 'Please wait...',
                                didOpen: () => {
                                    Swal.showLoading()
                                    timerInterval = setInterval(() => {
                                    }, 1000)
                                },
                                willClose: () => {
                                    clearInterval(timerInterval)
                                }
                            })
                            const sendRoom = async () => {
                                await axios.post(`https://excited-foal-raincoat.cyclic.app/room/view-room`, { token: validUser.token, roomID: room.roomID })
                                    .then(response => {
                                        // console.log(response.data.questions);

                                        const getRandom = (array) => {
                                            let ranNums = [],
                                                length = array.length,
                                                index = 0;
                                            while (length--) {
                                                index = Math.floor(Math.random() * (length + 1));
                                                if (array[index]?.question_type === 'mcq') {
                                                    array[index].options = getRandom(array[index].options)
                                                }
                                                ranNums.push(array[index]);
                                                array.splice(index, 1);
                                            }
                                            return ranNums;
                                        }
                                        const question = getRandom(response.data.questions)
                                        navigate('/Student/Exam', { state: { room: room, questions: question } })
                                    })
                                    .catch(error => {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'something went wrong',
                                            text: 'please try again later'
                                        })
                                    })
                            }
                            sendRoom();
                        }

                    } else {
                        Swal.fire('You will get a 0 if you dont attend the exam', '', 'info')
                    }
                })
            }
            else if (getStatus(room).status == 'ended') {

                Swal.fire({
                    width: '40%',
                    title: 'This exam has already ended',
                    icon: 'error',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'details',
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (room.participated) {
                            // console.log(room)
                            let timerInterval
                            Swal.fire({
                                text: 'Please wait...',
                                didOpen: () => {
                                    Swal.showLoading()
                                    timerInterval = setInterval(() => {
                                    }, 1000)
                                },
                                willClose: () => {
                                    clearInterval(timerInterval)
                                }
                            })
                            const sendDetails = async () => {
                                await axios.post(`https://excited-foal-raincoat.cyclic.app/room/view-room`, { token: validUser.token, roomID: room.roomID })
                                    .then(response => {
                                        // console.log(response.data)
                                        navigate('/examDetails', { state: { room: response.data, gotMarks: room.gotMarks } })

                                    })
                                    .catch(error => {
                                        // console.log(error)
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'something went wrong',
                                            text: 'please try again later'
                                        })
                                    })
                            }
                            sendDetails();
                            // Swal.fire({
                            //     width: '40vw',
                            //     title: `${room.CourseName}`,
                            //     html:
                            //         `Instructor : <b>${room.teacherName}</b>` + '</br>' +
                            //         `<p className='text-red-400'>You have scored <b>${room.gotMarks}</b> out of ${room.totalMarks} </p> ` +
                            //         `This exam was taken on <b>${new Date(`${room.startTime}`).toLocaleDateString()}</b>` + '</br>' +
                            //         'Better luck next time!',
                            //     icon: 'info'
                            // })
                        }
                        else {
                            Swal.fire({
                                icon: "error",
                                title: "access denied !!",
                                text: "You have not participated in this exam",
                            })

                        }

                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            }
            else {
                Swal.fire({
                    width: '40vw',
                    icon: 'info',
                    title: 'This exam has not started yet',
                    text: `Exam will start on  ${new Date(`${room.startTime}`).toDateString()}  at  ${new Date(`${room.startTime}`).toLocaleTimeString()}`,
                    showCancelButton: true,
                    confirmButtonText: 'Go to waiting room',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/Student/Timer', { state: { room: room } })
                    } else if (result.isDenied) {
                        Swal.fire('Changes are not saved', '', 'info')
                    }
                })
            }
        }

    }

    return (
        <div title='click me' className={`animate__animated animate__fadeInUp `}>
            <div data-tip="hello" onClick={() => { showRoom() }} className=" card w-96 shadow-xl image-full h-72 cursor-pointer hover:scale-105 transition-all " data-theme="halloween" >
                <figure><img src="https://placeimg.com/400/225/nature" alt="exams" /></figure>
                <div className={`card-body ${getStatus(room).animation} justify-between`}>
                    <div>
                        <h2 className="card-title text-gray-200">
                            {room.CourseName}
                            <div className='text-end w-full'>
                                <div className={`float-right badge ${getStatus(room).color} `}>{getStatus(room).status}</div>
                            </div>
                        </h2>
                        <div className='justify-start pt-2'>
                            <p className='text-start font-thin '>Instructor : <span className='font-normal'>{room.teacherName}</span></p>
                            <p className='text-start font-thin '>Total marks of exam : <span className='font-normal'>{room.totalMarks}</span></p>
                            <p className='text-start font-thin '>Exam duration : <span className='font-normal'>{examDays ? `${examDays} day` : ''} {examHours ? `${examHours} hour` : ''} {examMinutes ? `${examMinutes} minute` : ''}</span></p>

                            {
                                (validUser.usertype == 'student' && getStatus(room).status == "ended") ? <p className='text-start font-thin'>result : <span className='font-normal'>{room.gotMarks}</span> marks</p> : <p className='text-start font-thin '></p>
                            }
                        </div>
                    </div>
                    <div className="card-actions justify-start items-center">
                        <div className="badge badge-outline">{new Date(`${room.startTime}`).toDateString()}</div> at
                        <div className="badge badge-outline ">{new Date(`${room.startTime}`).toLocaleTimeString()}</div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SingleRoom;
