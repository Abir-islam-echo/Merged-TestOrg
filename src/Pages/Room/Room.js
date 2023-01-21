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


const Room = () => {
    const [a, setA] = useState(true)
    const { validUser } = useAuth()
    const [date, setDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [courseName, setCourseName] = useState('');
    const [teacherName, setTeacherName] = useState(null);
    const [markingType, setMarkingType] = useState(false);
    const navigate = useNavigate()

    const neg = (e) => {
        if (e.target.checked)
            setMarkingType(true)
        else
            setMarkingType(false)
    }
    const test = () => {
        if (date && startTime && endTime && courseName && (teacherName || validUser?.userName)) {
            navigate('/Form_test', { state: { date: date, startTime: startTime, endTime: endTime, courseName: courseName, teacherName: teacherName ? teacherName : validUser?.userName, markingType: markingType } });
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'Please fil up all the fields',
            })
        }
    }
    // console.log('start time', startTime)
    // console.log('date', date)
    // console.log('end time', endTime)
    // console.log('remaining time', endTime - startTime)
    // toDateString() -->'Thu Dec 01 2022'
    // toLocaleDateString() -->'12/1/2022'
    // toLocaleTimeString() -->'2:00:00 AM'
    // getTime() -->'2:00:00 AM' -->1672344000757 mseconds
    return (
        <div className='container min-h-screen c-mt m-auto pb-20'>
            <div className="flex md:flex-row justify-around gap-10 md:pt-24 flex-col">
                <div className="content w-full md:w-1/3 flex flex-col gap-10 lg:gap-24">

                    <div className='text-start'><label htmlFor="input" className='text-2xl text-cyan-800 font-serif font-bold'>Teacher</label><input defaultValue={validUser?.userName} onInput={(e) => setTeacherName(e.target.value)} className='mt-5 h-14 input border-2  border-cyan-700 animate__animated animate__slideInLeft' type="text" placeholder='teachers name' /></div>

                    <div className='text-start'><label htmlFor="input" className='text-2xl text-cyan-800 font-serif font-bold'>Course</label><input onInput={(e) => setCourseName(e.target.value)} className='mt-5 h-14 input border-2 border-cyan-700 animate__animated animate__slideInLeft' type="text" placeholder='course name' /></div>
                    <div className="form-control w-2/3 animate__animated animate__slideInLeft mt-[-30px]">
                        <label className="cursor-pointer label">
                            <input onInput={(e) => { neg(e) }} type="checkbox" className="checkbox checkbox-info  border-4" />
                            <span className="label-text text-gray-500 font-semibold text-xl">Negative Marking <span className=" text-gray-400 font-light text-lg">(optional)</span></span>
                        </label>
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
                                renderInput={(params) => <TextField {...params} />}
                                className='animate__animated animate__slideInRight'
                            />
                            <TimePicker
                                label="Start Time"
                                value={startTime}
                                onChange={(newValue) => {
                                    setStartTime(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                className='animate__animated animate__slideInRight'
                            />
                            <TimePicker
                                label="End Time"
                                value={endTime}
                                onChange={(newValue) => {
                                    setEndTime(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                className='animate__animated animate__slideInRight'
                            />

                        </Stack>
                    </LocalizationProvider>
                </div>
            </div>
            <div className='button-wrapper pt-40 animate__animated animate__fadeInUp'>
                <button onClick={() => test()} className='button-custom bg-gradient-to-tr from-indigo-800 via-cyan-500 to-indigo-800 btn  text-white px-16 hover:bg-indigo-700 border-none hover:tracking-widest transition-all'>Create Question &nbsp;&nbsp;&rarr;</button>
            </div>
        </div>
    );
};

export default Room;



{/* <div className="content w-full md:w-1/3 flex

                flex-col gap-10 lg:gap-20">

                    <div className='text-start flex items-center justify-between'><label htmlFor="input" className='text-2xl text-cyan-800 font-serif font-bold'>Exam Date</label><input className='mt-2 input border-2  border-cyan-700' type="date" name="" id="" /></div>

                    <div className='text-start flex items-center justify-between '><label htmlFor="input" className='text-2xl text-cyan-800 font-serif font-bold'>Starting time</label><input className='mt-2 input border-2 border-cyan-700' type="time" name="" id="" /></div>

                    <div className='text-start flex items-center justify-between '><label htmlFor="input" className='text-2xl text-cyan-800 font-serif font-bold'>End time</label><input className='mt-2 input border-2 border-cyan-700' type="time" name="" id="" /></div>

                </div> */}