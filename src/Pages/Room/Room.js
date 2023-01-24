import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate, useNavigation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import { Link } from 'react-router-dom';
import Form_test from '../../Form_test/Form_test';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import { set } from 'date-fns';
import { Checkbox } from 'react-miui';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Data } from '@syncfusion/ej2/grids';


const Room = () => {
    let b;
    const [a, setA] = useState(true)
    const { validUser } = useAuth()
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [courseName, setCourseName] = useState('');
    const [teacherName, setTeacherName] = useState(null);
    const [markingType, setMarkingType] = useState(false);
    const [copyQuestion, setCopyQuestion] = useState(false);
    const [category, setcategory] = useState(false);
    const [roomCode, setRoomCode] = useState(null);
    const navigate = useNavigate()


    const categorySelect = (e) => {
        if (e.target.checked)
            setcategory(true)
        else
            setcategory(false)
    }


    const fetchRoom = (e) => {
        if (e.target.checked)
            setCopyQuestion(true)
        else
            setCopyQuestion(false)
    }

    const neg = (e) => {
        if (e.target.checked)
            setMarkingType(true)
        else
            setMarkingType(false)
    }




    const test = () => {

        if (copyQuestion || roomCode) {
            if (roomCode && copyQuestion) {
                if (date && startTime && endTime && courseName && (teacherName || validUser?.userName)) {
                    let timerInterval
                    Swal.fire({
                        text: 'Copying questiions',
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
                        await axios.post(`https://excited-foal-raincoat.cyclic.app/room/get-question`, { roomID: roomCode })
                            .then(response => {
                                // console.log(response.data.questions);
                                // const getRandom = (array) => {
                                //     let ranNums = [],
                                //         length = array.length,
                                //         index = 0;
                                //     while (length--) {
                                //         index = Math.floor(Math.random() * (length + 1));
                                //         if (array[index]?.question_type === 'mcq') {
                                //             array[index].options = getRandom(array[index].options)
                                //         }
                                //         ranNums.push(array[index]);
                                //         array.splice(index, 1);
                                //     }
                                //     return ranNums;
                                // }
                                const question = response.data.questions
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Question copied successfully',
                                    showCancelButton: true,
                                    showConfirmButtont: true,
                                    confirmButtonText: 'proceed'
                                })
                                    .then((result) => {
                                        if (result.isConfirmed) {
                                            // save the confirmation
                                            let timerInterval
                                            Swal.fire({
                                                title: 'Saving...',
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
                                            const getInGlobalFormat = (date, time) => {
                                                return `${date} ${time}`;
                                            };
                                            const newStartTime = getInGlobalFormat(date?.$d?.toDateString(), startTime?.$d?.toLocaleTimeString());
                                            const newEndTime = getInGlobalFormat(date?.$d?.toDateString(), endTime?.$d?.toLocaleTimeString());
                                            let newroom;
                                            if (response.data.category == true) {
                                                newroom = {
                                                    token: validUser?.token,
                                                    startTime: newStartTime,
                                                    endTime: newEndTime,
                                                    courseName: courseName,
                                                    teacherName: teacherName ? teacherName : validUser?.userName,
                                                    totalMarks: response.data.totalMarks,
                                                    negMarks: markingType,
                                                    createdAt: new Date(),
                                                    questions: question,
                                                    category: true,
                                                    easyType: response.data.easyType,
                                                    hardType: response.data.hardType,
                                                    mediumType: response.data.mediumType,

                                                }

                                            }
                                            else {
                                                newroom = {
                                                    token: validUser?.token,
                                                    startTime: newStartTime,
                                                    endTime: newEndTime,
                                                    courseName: courseName,
                                                    teacherName: teacherName ? teacherName : validUser?.userName,
                                                    totalMarks: response.data.totalMarks,
                                                    negMarks: markingType,
                                                    createdAt: new Date(),
                                                    questions: question

                                                }

                                            }

                                            // console.log('room', room)

                                            async function sendData(newroom) {
                                                // console.log('called')
                                                await axios.post(`https://excited-foal-raincoat.cyclic.app/room/add-room`, newroom)
                                                    .then(response => {
                                                        // setGetRoomCode(response.data.roomCode)
                                                        console.log('after adding room', response)
                                                        setTimeout(() => {
                                                            Swal.fire({
                                                                title: 'Created exam',
                                                                text: 'send the exam code to your student',
                                                                icon: 'success',
                                                                confirmButtonText: 'generate code'
                                                            }).then(() => {
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
                                                                setTimeout(() => {
                                                                    Swal.fire({
                                                                        title: 'Exam code',
                                                                        html: `<b>${response.data.roomCode}</b><br>you can find this code in your room`,
                                                                        icon: 'success',
                                                                        confirmButtonText: 'copy',
                                                                        didOpen: () => {
                                                                            b = Swal.getHtmlContainer().querySelector('b').textContent
                                                                        },
                                                                    }).then(() => {
                                                                        navigator.clipboard.writeText(b);
                                                                        toast.success('Code copied', {
                                                                            autoClose: 2000,
                                                                            toastId: 'customId',
                                                                            position: 'top-right',
                                                                            theme: 'colored'
                                                                        })
                                                                        navigate('/myRooms')

                                                                    })
                                                                }, 2000)
                                                            })

                                                        }, 1000)
                                                    })
                                                    .catch(err => {
                                                        toast.error(err, {
                                                            autoClose: 2000,
                                                            toastId: 'customId',
                                                            position: 'top-right',
                                                            theme: 'colored'
                                                        })
                                                    })
                                            }
                                            sendData(newroom)

                                            localStorage.setItem('question', JSON.stringify(question))
                                        }
                                    })
                            })
                            .catch(error => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'room does not exist',
                                    text: 'please try again later'
                                })
                            })
                    }
                    sendRoom();

                    // 
                }
                else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Please fil up all the fields',
                    })
                }



            }
            else {
                Swal.fire({
                    icon: 'warning',
                    title: `Please ${copyQuestion ? 'give the room code' : 'check the checkbox'} to copy questions`,
                })
            }
        }


        else if (date && startTime && endTime && courseName && (teacherName || validUser?.userName)) {
            navigate('/Form_test', { state: { date: date, startTime: startTime, endTime: endTime, courseName: courseName, teacherName: teacherName ? teacherName : validUser?.userName, markingType: markingType, category: category } });
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'Please fil up all the fields',
            })
        }
    }

    return (
        <div className='container min-h-screen c-mt m-auto'>
            <div className="flex md:flex-row justify-around gap-10 md:pt-16 flex-col items-start">
                <div className="content w-full md:w-1/3 flex flex-col gap-10 lg:gap-10">

                    <div className='text-start'><label htmlFor="input" className='text-2xl text-cyan-800 font-serif font-bold'>Teacher</label><input defaultValue={validUser?.userName} onInput={(e) => setTeacherName(e.target.value)} className='mt-5 h-14 input border-2  border-cyan-700 animate__animated animate__slideInLeft' type="text" placeholder='teachers name' /></div>

                    <div className='text-start'><label htmlFor="input" className='text-2xl text-cyan-800 font-serif font-bold'>Course</label><input onInput={(e) => setCourseName(e.target.value)} className='mt-5 h-14 input border-2 border-cyan-700 animate__animated animate__slideInLeft' type="text" placeholder='course name' /></div>

                    <div className="flex flex-col animate__animated animate__slideInLeft pt-4 items-start justify-center gap-8">
                        <label className="cursor-pointer label p-0">
                            <input onInput={(e) => { neg(e) }} type="checkbox" className="checkbox checkbox-info  border-2" />
                            <span className="label-text text-gray-500 font-semibold text-xl pl-6">Negative Marking <span className=" text-gray-400 font-light text-lg">(optional)</span></span>
                        </label>
                        <span>
                            <label className="cursor-pointer label flex items-center p-0 mb-5">
                                <input onInput={(e) => { fetchRoom(e) }} type="checkbox" className="checkbox checkbox-info  border-2" />
                                <span className="label-text text-gray-500 font-semibold text-xl pl-6">Import question from another room <span className=" text-gray-400 font-light text-lg">(optional)</span></span>
                            </label>
                            <input onInput={(e) => setRoomCode(e.target.value)} className='h-10 input border-2  border-cyan-700 animate__animated animate__slideInLeft' type="text" placeholder='room code' />
                        </span>
                    </div>

                </div>
                <div className='lg:w-1/3'>
                    <div className='pb-5 text-start'>
                        <label htmlFor="input" className='text-2xl text-cyan-800 font-serif font-bold'>Exam date and time</label>
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={6}>
                            <DatePicker
                                label="Exam date"
                                views={['year', 'month', 'day']}
                                value={date}
                                onChange={(newValue) => {
                                    setDate(newValue);
                                }}
                                disablePast
                                renderInput={(params) => <TextField {...params} />}
                                className='animate__animated animate__slideInRight'
                            />
                            <TimePicker
                                minTime={dayjs().set('hour', new Date().getHours()).startOf('hour')}
                                label="Start Time"
                                value={startTime}
                                onChange={(newValue) => {
                                    setStartTime(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                className='animate__animated animate__slideInRight'
                            />
                            <div className={`w-full ${!startTime && 'tooltip tooltip-open tooltip-bottom tooltip-accent'} animate__animated animate__slideInRight `} data-tip={!startTime && 'you have to selet start time first'}>
                                <TimePicker
                                    disabled={!startTime}
                                    minTime={dayjs().set('hour', startTime && startTime.$d.getHours()).startOf('hour')}
                                    label="End Time"
                                    value={endTime}
                                    onChange={(newValue) => {
                                        setEndTime(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                    className='w-full'
                                />

                            </div>
                            {/* <TimePicker
                                title={!startTime && 'you need a'}
                                disabled={!startTime}
                                minTime={dayjs().set('hour', startTime && startTime.$d.getHours()).startOf('hour')}
                                label="End Time"
                                value={endTime}
                                onChange={(newValue) => {
                                    setEndTime(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                className='animate__animated animate__slideInRight'
                            /> */}

                        </Stack>
                    </LocalizationProvider>
                    <label className="cursor-pointer label px-0 pt-14 animate__animated animate__slideInLeft flex items-center justify-start">
                        <input onInput={(e) => { categorySelect(e) }} type="checkbox" className="checkbox checkbox-info border-2" />
                        <span className="label-text text-gray-500 font-semibold text-xl pl-6">Category based question <span className=" text-gray-400 font-light text-lg">(optional)</span></span>
                    </label>
                </div>
            </div>



            {/* <div className="flex animate__animated animate__slideInLeft pt-20 m-auto items-start justify-center gap-40">
                <label className="cursor-pointer label p-0">
                    <input onInput={(e) => { neg(e) }} type="checkbox" className="checkbox checkbox-info  border-4" />
                    <span className="label-text text-gray-500 font-semibold text-xl pl-10">Negative Marking <span className=" text-gray-400 font-light text-lg">(optional)</span></span>
                </label>
                <span>
                    <span className="cursor-pointer label flex items-center p-0 mb-5">
                        <input onInput={(e) => { fetchRoom(e) }} type="checkbox" className="checkbox checkbox-info  border-4" />
                        <span className="label-text text-gray-500 font-semibold text-xl pl-10">Copy question from another room <span className=" text-gray-400 font-light text-lg">(optional)</span></span>
                    </span>
                    <input onInput={(e) => setRoomCode(e.target.value)} className='h-10 input border-2  border-cyan-700 animate__animated animate__slideInLeft' type="text" placeholder='room code' />
                </span>

            </div> */}



            <div className='button-wrapper pt-32 animate__animated animate__fadeInUp'>
                <button onClick={() => test()} className='button-custom bg-gradient-to-tr from-indigo-800 via-cyan-500 to-indigo-800 btn  text-white px-16 hover:bg-indigo-700 border-none hover:tracking-widest transition-all shadow-xl'>Create Question &nbsp;&nbsp;&rarr;</button>
            </div>
        </div>
    );
};

export default Room;

