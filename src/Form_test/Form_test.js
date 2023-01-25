import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import Fill_gaps from '../Pages/Questions/Fill_gaps/Fill_gaps';
import { v4 as uuid } from 'uuid';

import Mcq from '../Pages/Questions/Mcq/Mcq';
import True_false from '../Pages/Questions/True_false/True_false';
import { Check } from '@mui/icons-material';

const Form_test = () => {
    const [easyMarks, setEasyMarks] = useState(1)
    const [mediumMarks, setMediumMarks] = useState(2)
    const [hardMarks, setHardMarks] = useState(3)

    let b;
    const navigate = useNavigate()
    const { validUser } = useAuth()
    // marks
    const [fromEasy, setFromEasy] = useState(0)
    const [fromMedium, setFromMedium] = useState(0)
    const [fromHard, setFromHard] = useState(0)
    // category count
    const [easyCount, setEasyCount] = useState([])
    const [mediumCount, setMediumCount] = useState([])
    const [hardCount, setHardCount] = useState([])
    // enable category
    const [isCategory, setIsCategory] = useState(false)

    const [questionFormData, setQuestionFormData] = useState([])
    const [getRoomCode, setGetRoomCode] = useState(null)
    const [questionForm, setQuestionForm] = useState([])
    const [isValidQsn, setIsValidQsn] = useState(true)
    const [totalMarks, setTotalMarks] = useState(0);
    const { state } = useLocation();
    const { date, startTime, endTime, teacherName, courseName, markingType, category } = state;

    const checkCategory = () => {
        let ecount = 0
        let mcount = 0
        let hcount = 0
        questionFormData.map(question => {
            if (question.category == 'easy') {
                ++ecount
                let arr = []
                // console.log('easy')
                for (let i = 1; i <= ecount; i++) {

                    arr.push(i)
                    setEasyCount(arr)
                }
            }
            else if (question.category == 'medium') {
                ++mcount
                let arr = []
                // console.log('easy')
                for (let i = 1; i <= mcount; i++) {

                    arr.push(i)
                    setMediumCount(arr)
                }
            }
            else {
                ++hcount
                let arr = []
                // console.log('easy')
                for (let i = 1; i <= hcount; i++) {

                    arr.push(i)
                    setHardCount(arr)
                }
            }

        })

    }



    const getInGlobalFormat = (date, time) => {
        return `${date} ${time}`;
    };
    const newStartTime = getInGlobalFormat(date?.$d?.toDateString(), startTime?.$d?.toLocaleTimeString());
    const newEndTime = getInGlobalFormat(date?.$d?.toDateString(), endTime?.$d?.toLocaleTimeString());

    const sTime = new Date(`${newStartTime}`).getTime();
    const eTime = new Date(`${newEndTime}`).getTime();
    const examDays = new Date(eTime).getDay() - new Date(sTime).getDay()
    const examHours = new Date(eTime).getHours() - new Date(sTime).getHours()
    const examMinutes = new Date(eTime - sTime).getMinutes()


    const addQuestion = (value) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        setQuestionForm((previous) => {
            return [...previous, { q_id: result, value: value }]
            // return [...previous, { q_id: questionForm.length + 1, value: value }]
        })
        setIsValidQsn(false)

    }

    // delete question
    const deleteQuestion = (id) => {
        // console.log(id, 'deleted');
        // console.log(questionFormData);
        const filterForMarks = questionFormData.filter((question) => {
            return question.q_id === id;
        })
        if (!category) {
            setTotalMarks(totalMarks - parseInt(filterForMarks[0].marks));
        }
        // console.log("total marks", totalMarks);


        const filterForShow = questionForm.filter((question) => {
            return question.q_id !== id;
        });
        setQuestionForm(filterForShow);
        // console.log("form", filterForShow);


        const filterForData = questionFormData.filter((question) => {
            return question.q_id !== id;
        });
        setQuestionFormData(filterForData);
        // console.log("form data", filterForData);
    }


    useEffect(() => {
        if (category) {
            checkCategory()
            let cmarks = ((easyCount.length) * easyMarks) + (((mediumCount.length)) * mediumMarks) + ((hardCount.length) * hardMarks)
            setTotalMarks(cmarks)
        }
    }, [questionFormData, questionForm, easyMarks, mediumMarks, hardMarks, isValidQsn]);




    // if user select any category
    const finalizeExam = () => {
        if (fromEasy || fromMedium || fromHard) {
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
            const room = {
                token: validUser?.token,
                startTime: newStartTime,
                endTime: newEndTime,
                courseName: courseName,
                teacherName: teacherName,
                totalMarks: totalMarks,
                negMarks: markingType,
                createdAt: new Date(),
                questions: questionFormData,
                category: category,
                easyType: parseInt(fromEasy),
                mediumType: parseInt(fromMedium),
                hardType: parseInt(fromHard),
                easyMarks: easyMarks,
                mediumMarks: mediumMarks,
                hardMarks: hardMarks,
                totalMarksOfExam: ((parseInt(fromEasy)) * easyMarks) + (((parseInt(fromMedium))) * mediumMarks) + ((parseInt(fromHard)) * hardMarks)

            }
            // console.log(room)

            async function sendData(room) {
                // console.log('called')
                await axios.post(`https://excited-foal-raincoat.cyclic.app/room/add-room`, room)
                    .then(response => {

                        setGetRoomCode(response.data.roomCode)
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
            sendData(room)

            localStorage.setItem('question', JSON.stringify(questionFormData))
            // save the confirmation

        }
        else {
            Swal.fire({
                width: '40vw',
                icon: "warning",
                title: "please select at least one category"
            })
        }
    }




    const categoryEnable = () => {
        setIsCategory(true)
        setIsValidQsn(false)
        checkCategory()
        let cmarks = ((easyCount.length) * easyMarks) + (((mediumCount.length)) * mediumMarks) + ((hardCount.length) * hardMarks)
        setTotalMarks(cmarks)
        Swal.fire({
            width: '60vw',
            title: 'questions saved',
            text: 'please select the number of questions from category section and add question marks for each category',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            cancelButtonText: 'cancel',
            icon: 'success',

        })
            .then(result => {
                if (result.isConfirmed) {
                    setIsCategory(true)
                    setIsValidQsn(false)
                    checkCategory()

                }
                else {
                    setIsCategory(false)
                    setIsValidQsn(true)
                    checkCategory()
                }
            })

    }





    // if no category is selected
    const saveData = () => {
        // console.log(easyCount, mediumCount, hardCount);
        Swal.fire({
            html: `you have created total <b>${questionFormData.length}</b> questions`,
            title: 'Are you sure you want to save this question?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            icon: 'warning',
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
                    const room = {
                        token: validUser?.token,
                        startTime: newStartTime,
                        endTime: newEndTime,
                        courseName: courseName,
                        teacherName: teacherName,
                        totalMarks: totalMarks,
                        negMarks: markingType,
                        createdAt: new Date(),
                        questions: questionFormData,
                        category: category,
                        easyType: questionFormData.length,
                        mediumType: 0,
                        hardType: 0,
                        easyMarks: 0,
                        mediumMarks: 0,
                        hardMarks: 0,
                        totalMarksOfExam: 0
                    }
                    // console.log(room)

                    async function sendData(room) {
                        // console.log('called')
                        await axios.post(`https://excited-foal-raincoat.cyclic.app/room/add-room`, room)
                            .then(response => {

                                setGetRoomCode(response.data.roomCode)
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
                    sendData(room)

                    localStorage.setItem('question', JSON.stringify(questionFormData))
                    // save the confirmation

                }
                else {
                    return;
                }
            })
    }


    return (
        <div className='m-auto mb-20 c-mt pb-10 min-h-screen container relative'>
            {
                category && <div className='animate__animated animate__slideInDown min-w-[18rem] min-h-screen category-base fixed right-0 top-16 p-5 z-20 bg-white  border-black  shadow-2xl rounded-md'>
                    <div className='flex flex-col gap-10 w-56'>
                        <p>you can select category after saving question</p>
                        <span className='text-start'>
                            <p>easy</p>
                            {/* disabled={!isCategory} */}
                            <select onChange={(e) => { setFromEasy(e.target.value) }} data-theme='light' className={`select rounded-md border-cyan-600 select-bordered w-full max-w-xs mt-1 outline-none pointer-events-no`}>
                                <option disabled selected>Number of questions</option>
                                {
                                    easyCount.map((value, index) => {
                                        return (
                                            <option key={index}>{index + 1}</option>
                                        )
                                    })
                                }
                            </select>
                        </span>
                        <span className='text-start'>
                            <p>medium</p>
                            {/* disabled={!isCategory} */}
                            <select onChange={(e) => { setFromMedium(e.target.value) }} data-theme='light' className={`select rounded-md border-cyan-600 select-bordered w-full max-w-xs mt-1  outline-none `}>
                                <option disabled selected>Number of questions</option>
                                {
                                    mediumCount.map((value, index) => {
                                        return (
                                            <option key={index}>{index + 1}</option>
                                        )
                                    })
                                }
                            </select>
                        </span>
                        <span className='text-start'>
                            <p>hard</p>
                            {/* disabled={!isCategory} */}
                            <select onChange={(e) => { setFromHard(e.target.value) }} data-theme='light' className={`select rounded-md border-cyan-600 select-bordered w-full max-w-xs mt-1  outline-none }`}>
                                <option disabled selected>Number of questions</option>
                                {
                                    hardCount.map((value, index) => {
                                        return (
                                            <option key={index}>{index + 1}</option>
                                        )
                                    })
                                }
                            </select>
                        </span>
                        <span>
                            <p className='text-lg text-gray-600'>
                                total <span className='font-bold'>{parseInt(fromEasy) + parseInt(fromMedium) + parseInt(fromHard)}</span> questions with <span className='font-bold'>{((parseInt(fromEasy)) * easyMarks) + (((parseInt(fromMedium))) * mediumMarks) + ((parseInt(fromHard)) * hardMarks)}</span> marks of exam will be showed randomly to each student
                            </p>
                        </span>
                    </div>
                    <div className='pt-[200px] px-2'>
                        {
                            isCategory ? <button title='finalize' className='w-full hover:bg-green-600 button-custom bg-gradient-to-tr from-green-800 via-green-600 to-green-800 text-white font-bold py-5 rounded text-xl button-custom transition-all' onClick={() => finalizeExam()}>Finalize&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-check"></i></button> :
                                <div>
                                    {
                                        (questionForm.length >= 2) ? <button title='save' className='w-full hover:bg-green-600 button-custom bg-gradient-to-tr from-green-800 via-green-600 to-green-800 text-white font-bold py-5 px-4 rounded text-xl button-custom transition-all' onClick={() => categoryEnable()}>save question&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-duotone fa-floppy-disk" /></button> : <button title='you have to make at least 2 questions' className='w-full hover:bg-green-600 button-custom bg-gradient-to-tr from-green-800 via-green-600 to-green-800 text-white font-bold py-5 px-4 rounded text-xl button-custom  transition-all' onClick={() => Swal.fire({
                                            title: 'you have to make at least 2 questions',
                                            icon: 'warning',
                                            confirmButtonText: 'ok'
                                        })}>save question&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-duotone fa-floppy-disk" /></button>
                                    }
                                </div>
                        }

                    </div>

                </div>
            }



            <div className='text-start z-40 w-[1220px] m-auto fixed left-0 right-0 bg-gray-100 py-5'>
                <div className='z-40 flex justify-between items-start'>
                    <div tabIndex={0} class="cursor-pointer dropdown animate__animated animate__slideInRight z-40">
                        <span className='shadow-inner rounded-2xl px-20 py-2 flex items-baseline gap-10 bg-gray-200 hover:bg-slate-300  hover:text-blue-600 hover:shadow-2xl transition-all'><h1 className='text-xl font-semibold'>Details</h1><i class="fas fa-duotone fa-circle-info"></i></span>
                        <div tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-40">
                            <div className="overflow-x-auto rounded-lg shadow-2xl">
                                <table className="table w-full">
                                    <thead>
                                        <tr>
                                            <th className='text-3xl'>Exam details</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='text-2xl pl-10'>Teacher</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><p className='text-gray-300 text-xl'>{teacherName}</p></td>
                                        </tr>
                                        <tr>
                                            <td className='text-2xl pl-10'>Course</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><p className='text-gray-300 text-xl'>{courseName}</p></td>
                                        </tr>
                                        <tr>
                                            <td className='text-2xl pl-10'>Exam date</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><p className='text-gray-300 text-xl'>{date.$d.toDateString()}</p></td>
                                        </tr>

                                        <tr>
                                            <td className='text-2xl pl-10'>Starting time</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><p className='text-gray-300 text-xl'>{startTime.$d.toLocaleTimeString()}</p></td>
                                        </tr>

                                        <tr>
                                            <td className='text-2xl pl-10'>Ending time</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><p className='text-gray-300 text-xl'>{endTime.$d.toLocaleTimeString()}</p></td>
                                        </tr>
                                        <tr>
                                            <td className='text-2xl pl-10'>Exam duration</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><p className='text-gray-300 text-xl'>{examDays ? `${examDays} day` : ''} {examHours ? `${examHours} hour` : ''} {examMinutes ? `${examMinutes} minute` : ''}</p></td>
                                        </tr>
                                        <tr>
                                            <td className='text-2xl pl-10'>Marking type</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><p className=' text-xl pr-16 text-gray-300'>{markingType ? "Negative Marking Scheme" : "Normal Marking Scheme"}</p></td>
                                        </tr>
                                        <tr>
                                            <td className='text-2xl pl-10'>Category</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td><p className=' text-xl pr-16 text-gray-300'>{category ? "Category based question" : "No category"}</p></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {
                        category && <div className='flex gap-10 animate__animated animate__slideInDown'>
                            <span className='text-start w-[150px] drop-shadow-lg'>
                                <p className='text-gray-500'>marks for easy</p>
                                <select onChange={(e) => { setEasyMarks(e.target.value) }} data-theme='light' className={`select rounded-md border-cyan-600 select-bordered w-full max-w-xs mt-1 outline-none pointer-events-no`}>
                                    <option selected>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </span>
                            <span className='text-start  w-[150px] drop-shadow-lg'>
                                <p className='text-gray-500'>marks for medium</p>
                                <select onChange={(e) => { setMediumMarks(e.target.value) }} data-theme='light' className={`select rounded-md border-cyan-600 select-bordered w-full max-w-xs mt-1 outline-none pointer-events-no`}>
                                    <option selected>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>

                                </select>
                            </span>
                            <span className='text-start  w-[150px] drop-shadow-lg'>
                                <p className='text-gray-500'>marks for hard</p>
                                <select onChange={(e) => { setHardMarks(e.target.value) }} data-theme='light' className={`select rounded-md border-cyan-600 select-bordered w-full max-w-xs mt-1 outline-none pointer-events-no`}>
                                    <option selected>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>

                                </select>
                            </span>
                        </div>
                    }
                </div>

            </div>


            <div className="pt-36 mb-96 container flex flex-col gap-10 m-auto justify-between animate__animated animate__fadeInUp animate__faster ">
                <div className="bottom flex flex-col lg:w-4/5 gap-20 w-full pb-40 m-auto">
                    {
                        questionForm.map((question, index) => {
                            if (question.value === 'mcq') {
                                return (
                                    <Mcq category={category} setQuestionForm={setQuestionForm} questionForm={questionForm} index={index + 1} questionFormData={questionFormData} setQuestionFormData={setQuestionFormData} q_id={question.q_id} key={question.q_id + 1} deleteQuestion={deleteQuestion} setIsValidQsn={setIsValidQsn} totalMarks={totalMarks} setTotalMarks={setTotalMarks} addQuestion={addQuestion} ></Mcq>
                                )
                            }
                            else if (question.value === 'true-false') {
                                return (
                                    <True_false category={category} setQuestionForm={setQuestionForm} questionForm={questionForm} index={index + 1} questionFormData={questionFormData} setQuestionFormData={setQuestionFormData} q_id={question.q_id} key={question.q_id + 1} deleteQuestion={deleteQuestion} setIsValidQsn={setIsValidQsn} totalMarks={totalMarks} setTotalMarks={setTotalMarks} addQuestion={addQuestion}></True_false>
                                )
                            }
                            else if (question.value === 'fill-blanks') {
                                return (
                                    <Fill_gaps category={category} setQuestionForm={setQuestionForm} questionForm={questionForm} index={index + 1} questionFormData={questionFormData} setQuestionFormData={setQuestionFormData} q_id={question.q_id} key={question.q_id + 1} deleteQuestion={deleteQuestion} setIsValidQsn={setIsValidQsn} totalMarks={totalMarks} setTotalMarks={setTotalMarks} addQuestion={addQuestion}  ></Fill_gaps>
                                )
                            }
                        })
                    }
                </div>
            </div>


            <div className='animate__animated animate__slideInUp fixed left-0 top-16 p-2 z-20 bg-white   shadow-2xl rounded-md min-h-screen min-w-[18rem]'>
                <div className='flex flex-col gap-10'>
                    <div className='px-6 py-3 rounded-lg bg-white shadow-lg flex flex-col justify-between'>
                        <p className='text-gray-500 text-lg'>Total questions</p>
                        <p className='text-gray-700 text-2xl py-2 font-semibold'>{questionFormData.length}</p>
                    </div>
                    <div className='px-6 py-3 rounded-lg bg-white shadow-lg flex flex-col justify-between'>
                        <p className='text-gray-500 text-lg'>Total marks counted</p>
                        <p className='text-gray-700 text-2xl py-2 font-semibold'>{totalMarks}</p>
                    </div>

                </div>

                <div className="flex flex-col flex-auto pt-[100px]">
                    <div className='flex flex-col'>
                        <button className={`btn flex-1 m-2 font-bold py-2 px-4 rounded  ${isValidQsn ? 'border-none hover:opacity-80 hover:text-black bg-gradient-to-tr from-indigo-800 to-cyan-600  text-white' : 'btn-disabled'}`} onClick={() => { addQuestion('mcq') }}>MCQ</button>
                        <button className={`btn flex-1 m-2 font-bold py-2 px-4 rounded ${isValidQsn ? 'border-none hover:opacity-80 hover:text-black bg-gradient-to-tr from-indigo-800 to-cyan-600 text-white' : 'btn-disabled'}`} onClick={() => { addQuestion('true-false') }}>True / False</button>
                        <button className={`btn flex-1 m-2 font-bold py-2 px-4 rounded ${isValidQsn ? 'border-none hover:opacity-80 hover:text-black bg-gradient-to-tr from-indigo-800 to-cyan-600 text-white' : 'btn-disabled'}`} onClick={() => { addQuestion('fill-blanks') }}>Fill Blanks</button>

                    </div>
                </div>

                <div>
                    {
                        !category && <div className='pt-[230px] px-4'>
                            {
                                (questionForm.length >= 2) ? <button title='save' className='w-full hover:bg-green-600 button-custom bg-gradient-to-tr from-green-800 via-green-600 to-green-800 text-white font-bold py-5 px-4 rounded text-xl button-custom transition-all' onClick={() => saveData()}>save question&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-duotone fa-floppy-disk" /></button> : <button title='you have to make at least 2 questions' className='w-full hover:bg-green-600 button-custom bg-gradient-to-tr from-green-800 via-green-600 to-green-800 text-white font-bold py-5 px-4 rounded text-xl button-custom  transition-all' onClick={() => Swal.fire({
                                    title: 'you have to make at least 2 questions',
                                    icon: 'warning',
                                    confirmButtonText: 'ok'
                                })}>save question&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-duotone fa-floppy-disk" /></button>
                            }
                        </div>
                    }
                </div>

            </div>
        </div>
    );
};

export default Form_test;
