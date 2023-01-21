import React, { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import ExamTimer from './ExamTimer/ExamTimer';
import Loader from '../../Loader/Loader';
import axios from 'axios';
import { toast } from 'react-toastify';

const Exam = () => {
    const { validUser } = useAuth()
    const navigate = useNavigate()
    const [expired, setExpired] = useState(true);
    const [running, setRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [firstime, setFirstime] = useState(true);
    const [remainingTime, setRemainingTime] = useState();
    const [newQuestion, setNewQuestion] = useState([])

    if (!useLocation().state) {
        Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            text: 'please try again later',
            confirmButtonText: 'back to homepage',
        }).then(() => {
            window.location.assign(`${window.location.origin}/Home`);
        })
    }
    const { state } = useLocation();
    const { room, questions } = state;

    if (firstime) {
        setTimeout(() => {
            setNewQuestion(oldArray => [...oldArray, questions[0]]);
        }, 100)

        setTimeout(() => {
            setRunning(true)
        }, 1000)

    }

    const [answers, setAnswers] = useState([]);
    const [count, setCount] = useState(1)
    const [input, setInput] = useState(false)

    const submitResult = async () => {
        const result = {
            token: validUser.token,
            negMarks: room.negMarks,
            roomID: room.roomID,
            studentAnswer: answers
        }
        // console.log('result', result)

        await axios.post(`https://excited-foal-raincoat.cyclic.app/room/submit-result`, result)
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Great!',
                    text: 'Result submitted successfully',
                }).then(() => {
                    navigate("/student")
                })
            })
            .catch((error) => {
                console.log(error)
                toast.error(`${error.message}`)
            })

    }

    const changeQuestion = () => {

        const filtered_questions = questions.filter((question) => {
            return questions.indexOf(question) === count
        });
        setNewQuestion(filtered_questions)

        if (count >= questions.length) {

            setIsFinished(true);
            Swal.fire({
                icon: 'success',
                title: 'Good job!',
                html: `<h1><b>You have answred ${answers.length} questions! out of ${questions.length}</b></h1>
                <br>
                <p className='animate-pulse'>You can find your result in your room</p>`,
                confirmButtonText: 'Ok',
            })
            Swal.showLoading()
            setTimeout(() => {
                submitResult();
            }, 3000)
        }
    }

    const startTime = new Date(`${room.startTime}`).getTime();
    const endTime = new Date(`${room.endTime}`).getTime();
    const currentTime = new Date().getTime();
    const examDays = new Date(endTime).getDay() - new Date(startTime).getDay()
    const examHours = new Date(endTime).getHours() - new Date(startTime).getHours()
    const examMinutes = new Date(endTime - startTime).getMinutes()

    if (firstime) {
        if (startTime > currentTime) {
            setIsFinished(true);
            Swal.fire({
                width: '40vw',
                icon: 'info',
                title: 'This exam has not started yet',
                text: `Exam will start on  ${new Date(`${room.startTime}`).toDateString()}  at  ${new Date(`${room.startTime}`).toLocaleTimeString()}`,
                showCancelButton: true,
                confirmButtonText: 'Go to waiting room',
            })

        }
        else if (currentTime >= startTime && currentTime < endTime) {
            setIsFinished(false);
            setRemainingTime(endTime - currentTime)
            Swal.fire({
                width: '50vw',
                title: `Exam has been started ${new Date(currentTime)?.getHours() - new Date(startTime)?.getHours()} hours  ${new Date(currentTime - startTime).getMinutes()} minutes ago`,
                confirmButtonText:
                    'Continue Exam',
            })
            setExpired(false);
        }

        else {
            setIsFinished(true);
            Swal.fire({
                width: '50%',
                title: 'This exam has already ended',
                text: 'to see result go to your room!',
                icon: 'error',
            })
        }
        setFirstime(false)
    }
    return (
        <div className='container m-auto c-mt py-5 min-h-screen'>
            <div className='rounded-2xl shadow-lg text-start z-40 mb-16'>
                <div className='z-40'>
                    <div tabIndex={0} class="cursor-pointer dropdown animate__animated animate__slideInRight z-40 transition-all">
                        <span className='shadow-inner rounded-2xl px-20 py-2 flex items-baseline gap-10 bg-gray-200 hover:bg-slate-300  hover:text-blue-600 hover:shadow-2xl transition-all'><h1 className='text-xl font-semibold'>Details</h1><i class="fas fa-duotone fa-circle-info"></i></span>
                        <div tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-40 transition-all">
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
                                            <td><p className='text-gray-300 text-xl pr-20'>{room.teacherName}</p></td>
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
                                            <td><p className='text-gray-300 text-xl pr-20'>{room.CourseName}</p></td>
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
                                            <td><p className=' text-xl pr-0'>{room.negMarks ? "Negative Marking Scheme" : "Normal Marking Scheme"}</p></td>
                                        </tr>
                                        <tr>
                                            <td className='text-2xl pl-10'>Total marks</td>
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
                                            <td><p className='text-gray-300 text-xl pr-20'>{room.totalMarks}</p></td>
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
                                            <td><p className=' text-xl pr-0'>{examDays ? `${examDays} day` : ''} {examHours ? `${examHours} hour` : ''} {examMinutes ? `${examMinutes} minute` : ''}</p></td>
                                        </tr>
                                        <tr>
                                            <td className='text-2xl pl-10'>Ending at</td>
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
                                            <td><p className='text-gray-300 text-xl pr-20'>{new Date(room.endTime).toLocaleTimeString()}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {
                running ? <div>{
                    !isFinished ? <div >
                        <ExamTimer key={12345} remainingTime={remainingTime} setIsFinished={setIsFinished} submitResult={submitResult} expired={expired}></ExamTimer>

                        <div className='m-auto flex flex-col gap-20 lg:w-2/3 rounded-md text-gray-800 text-xl '>
                            {
                                newQuestion.map((element) => {
                                    if (element.question_type === 'true-false') {
                                        return (
                                            <ShowTrue setInput={setInput} answers={answers} setAnswers={setAnswers} index={count} question={element.question} marks={element.marks} correct_answer={element.correct_answer} q_id={element.q_id} key={count}></ShowTrue>
                                        )
                                    }
                                    else if (element.question_type === 'mcq') {
                                        return (
                                            <ShowQuiz key={count} setInput={setInput} answers={answers} setAnswers={setAnswers} index={count} question={element.question} marks={element.marks} options={element.options} correct_answer={element.correct_answer} q_id={element.q_id}></ShowQuiz>
                                        )
                                    }
                                    else if (element.question_type === 'fill-blanks') {
                                        return (
                                            <ShowGaps key={count} setInput={setInput} answers={answers} setAnswers={setAnswers} index={count} question={element.question} marks={element.marks} correct_answer={element.correct_answer} q_id={element.q_id}></ShowGaps>
                                        )
                                    }

                                })
                            }
                        </div>
                        <div className="button-wrapper text-end lg:w-2/3 m-auto pt-10">
                            {
                                input ? <button onClick={() => { changeQuestion(); setCount(count + 1) }} className='nb-custom bg-gradient-to-r from-indigo-800 via-cyan-500 to-indigo-800 btn  text-white px-16 hover:bg-indigo-700'>Next &nbsp;&nbsp;&rarr;</button> : <button disabled title='give an answer first' className='btn transition-all px-16 disabled:text-gray-600'>Next &nbsp;&nbsp;&rarr;</button>
                            }
                        </div>
                    </div> : <div className='pt-72'>
                        <Link to={'/Home'} className=' transition-all button-custom bg-gradient-to-tr from-indigo-800 via-cyan-500 to-indigo-800 btn  text-white px-16 hover:bg-indigo-700 hover:tracking-widest border-none'>Go back to Home</Link>
                    </div>
                }</div> : <div className='pt-56 m-auto flex flex-col items-center justify-center gap-10'><Loader /> <h1>please wait ...</h1></div>

            }


        </div>
    );
};

export default Exam;





const ShowQuiz = (props) => {
    const { index, question, marks, options, setAnswers, answers, setInput, correct_answer, q_id } = props;
    const inputValue = (e) => {
        let arr = [...answers];
        arr[index - 1] = {
            q_id: q_id,
            correct_answer: correct_answer,
            student_answer: e,
            marks: marks
        }
        setAnswers(arr)
        setInput(true)
        // let arr = [...answers];
        // arr[index - 1] = e
        // setAnswers(arr)
        // setInput(true)
    }

    return (
        <div className='rounded-lg flex flex-col gap-10 p-10 py-16 shadow-lg border-l-8 border-l-cyan-600 bg-white animate__animated animate__fadeIn'>
            <div className='flex justify-between'>
                <span className='flex gap-5 text-start'>
                    <p className='text-2xl'>{index}.</p>
                    <h3 className='break-all pr-10 font-semibold text-2xl'>{question} ?</h3>
                </span>
                <p className='text-success'>{marks}<span className='text-sm'> marks</span></p>
            </div>
            <div className='flex flex-col gap-6'>
                {
                    options.map((option, index) => {
                        return (
                            <Option option={option.value} key={index} inputValue={inputValue}></Option>
                        )
                    })
                }
            </div>
        </div>
    )
}

const Option = (props) => {
    const { option, inputValue } = props;

    return (
        <div className="radio-group flex gap-4 items-center ">
            <input onInput={() => { inputValue(option) }} type="radio" name="radio" className="radio-field radio border-2 border-cyan-600 radio-accent" />
            <p className='break-all'>{option}</p>
        </div>
    )
}
















const ShowGaps = (props) => {
    const { index, question, marks, setAnswers, answers, setInput, correct_answer, q_id } = props;
    const inputValue = (e) => {
        // let arr = [...answers];
        // arr[index - 1] = e
        // setAnswers(arr);
        // setInput(true)
        let arr = [...answers];
        arr[index - 1] = {
            q_id: q_id,
            correct_answer: correct_answer,
            student_answer: e,
            marks: marks
        }
        setAnswers(arr)
        setInput(true)
    }

    return (
        <div className='rounded-lg flex flex-col gap-10 p-10 py-16 shadow-lg border-l-8 border-l-cyan-600 bg-white animate__animated animate__fadeIn'>
            <div className='flex justify-between'>
                <span className='flex gap-5 text-start'>
                    <p className='text-2xl'>{index}.</p>
                    <h3 className='break-all pr-10 font-semibold text-2xl'>{question} ?</h3>
                </span>
                <p className='text-success'>{marks}<span className='text-sm'> marks</span></p>
            </div>
            <div className="gap-4 border-cyan-600 border-b-2 w-1/2">
                <input onInput={(e) => { inputValue(e.target.value) }} className='text-field border-none text-xl rounded-md' type="text" placeholder='answer' autoFocus />
            </div>
        </div>
    )
}















const ShowTrue = (props) => {
    const { index, question, marks, setAnswers, answers, setInput, correct_answer, q_id } = props;
    const inputValue = (e) => {
        // let arr = [...answers];
        // arr[index - 1] = e
        // setAnswers(arr);
        // setInput(true)

        let arr = [...answers];
        arr[index - 1] = {
            q_id: q_id,
            correct_answer: correct_answer,
            student_answer: e,
            marks: marks
        }
        setAnswers(arr)
        setInput(true)
    }

    return (
        <div className='rounded-lg flex flex-col gap-10 p-10 py-16 shadow-lg border-l-8 border-l-cyan-600 bg-white animate__animated animate__fadeIn'>
            <div className='flex justify-between'>
                <span className='flex gap-5 text-start'>
                    <p className='text-2xl'>{index}.</p>
                    <h3 className='break-all pr-10 font-semibold text-2xl'>{question} ?</h3>
                </span>
                <p className='text-success'>{marks}<span className='text-sm'> marks</span></p>
            </div>
            <div className='flex flex-col gap-5'>
                <div className="radio-group flex gap-4">
                    <input onInput={(e) => { inputValue(e.target.value) }} type="radio" name="radio" className="radio-field radio border-2 border-cyan-600 radio-accent" value={'true'} />
                    <p>true</p></div>
                <div className="radio-group flex gap-4">
                    <input onInput={(e) => { inputValue(e.target.value) }} type="radio" name="radio" className="radio-field radio border-2 border-cyan-600 radio-accent" value={'false'} />
                    <p>false</p></div>
            </div>
        </div>

    )
}


