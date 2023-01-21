import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';


const ExamDetails = () => {
    const { validUser } = useAuth()
    const { state } = useLocation();
    const { room, gotMarks } = state
    const startTime = new Date(`${room.startTime}`).getTime();
    const endTime = new Date(`${room.endTime}`).getTime();
    const currentTime = new Date().getTime();
    const examDays = new Date(endTime).getDay() - new Date(startTime).getDay()
    const examHours = new Date(endTime).getHours() - new Date(startTime).getHours()
    const examMinutes = new Date(endTime - startTime).getMinutes()


    Swal.fire({
        icon: "success",
        text: 'Data loaded successfully',

    })
    // console.log(room)
    return (
        <div className='container m-auto c-mt py-10 min-h-screen pb-72' >
            <div className='w-full shadow-md rounded-lg p-4 text-start mb-10 border-l-cyan-700 border-l-8'>
                <h1 className='animate__animated  animate__fadeInRight text-4xl font-semibold '>Details of exam</h1>
            </div>


            {
                validUser.usertype == "teacher" ? <div className='teacher'><div className='pb-40 animate__animated animate__fadeInUp'>
                    <div className="overflow-x-auto pb-10 border-b-4 border-b-stone-300 rounded-md shadow-2xl " data-theme="corporate">
                        <table className="table w-full">
                            <thead data-theme="aqua">
                                <tr>
                                    <th className='text-2xl pl-10'>Exam information</th>
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
                                    <td className='text-2xl pl-10'>Room Code</td>
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
                                    <td><p className=' text-xl pr-0'>{room._id} <span onClick={() => {
                                        navigator.clipboard.writeText(room._id);
                                        toast.success('Code copied', {
                                            autoClose: 2000,
                                            toastId: 'customId',
                                            position: 'top-right',
                                            theme: 'colored'
                                        })
                                    }} className='btn ml-10 px-10'>copy</span></p></td>
                                </tr>
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
                                    <td><p className=' text-xl pr-0'>{room.teacherName}</p></td>
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
                                    <td><p className=' text-xl pr-0'>{room.courseName}</p></td>
                                </tr>
                                <tr>
                                    <td className='text-2xl pl-10'>Exam created</td>
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
                                    <td><p className=' text-xl pr-0'>{new Date(room.createdAt).toDateString()} &nbsp;&nbsp; at &nbsp;&nbsp; {new Date(room.createdAt).toLocaleTimeString()}</p></td>
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
                                    <td><p className=' text-xl pr-0'>{new Date(room.endTime).toDateString()}</p></td>
                                </tr>
                                <tr>
                                    <td className='text-2xl pl-10'>Start time</td>
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
                                    <td><p className=' text-xl pr-0'>{new Date(room.startTime).toLocaleTimeString()}</p></td>
                                </tr>
                                <tr>
                                    <td className='text-2xl pl-10'>End time</td>
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
                                    <td><p className=' text-xl pr-0'>{new Date(room.endTime).toLocaleTimeString()}</p></td>
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
                                    <td className='text-2xl pl-10'>Total questions</td>
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
                                    <td><p className=' text-xl pr-0'>{room.questions.length} &nbsp; questions</p></td>
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
                                    <td><p className=' text-xl pr-0'>{room.totalMarks} &nbsp; marks</p></td>
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
                                    <td className='text-2xl pl-10'>Participated</td>
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
                                    <td><p className=' text-xl pr-0'>{room.totalParticipants} &nbsp; students</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                    <div className='m-auto flex flex-col rounded-md text-gray-800 text-xl overflow-hidden shadow-2xl'>
                        <h1 data-theme="aqua" className='text-3xl py-10'>Questions</h1>
                        {/* <span className='border-2 border-gray-400 mb-10 w-1/2 m-auto'></span> */}
                        {
                            room.questions.map((element, index) => {
                                if (element.question_type === 'true-false') {
                                    return (
                                        <ShowTrue index={index + 1} question={element.question} marks={element.marks} correct_answer={element.correct_answer} q_id={element.q_id} key={index}></ShowTrue>
                                    )
                                }
                                else if (element.question_type === 'mcq') {
                                    return (
                                        <ShowQuiz key={index} index={index + 1} question={element.question} marks={element.marks} options={element.options} correct_answer={element.correct_answer} q_id={element.q_id}></ShowQuiz>
                                    )
                                }
                                else if (element.question_type === 'fill-blanks') {
                                    return (
                                        <ShowGaps key={index} index={index + 1} question={element.question} marks={element.marks} correct_answer={element.correct_answer} q_id={element.q_id}></ShowGaps>
                                    )
                                }

                            })
                        }
                    </div>
                </div> : <div className='student '><div className='pb-40 rounded-md animate__animated animate__fadeInUp '>
                    <div className="overflow-x-auto pb-10 border-b-4 border-b-stone-300 rounded-md shadow-2xl" data-theme="corporate">
                        <table className="table w-full">
                            <thead data-theme="aqua">
                                <tr>
                                    <th className='text-2xl pl-10'>Exam information</th>
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
                                    <td><p className=' text-xl pr-0'>{room.teacherName}</p></td>
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
                                    <td><p className=' text-xl pr-0'>{room.courseName}</p></td>
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
                                    <td><p className=' text-xl pr-0'>{new Date(room.endTime).toDateString()}</p></td>
                                </tr>
                                <tr>
                                    <td className='text-2xl pl-10'>Start time</td>
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
                                    <td><p className=' text-xl pr-0'>{new Date(room.startTime).toLocaleTimeString()}</p></td>
                                </tr>
                                <tr>
                                    <td className='text-2xl pl-10'>End time</td>
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
                                    <td><p className=' text-xl pr-0'>{new Date(room.endTime).toLocaleTimeString()}</p></td>
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
                                    <td className='text-2xl pl-10'>Total questions</td>
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
                                    <td><p className=' text-xl pr-0'>{room.questions.length} &nbsp; questions</p></td>
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
                                    <td><p className=' text-xl pr-0'>{room.totalMarks} &nbsp; marks</p></td>
                                </tr>
                                <tr>
                                    <td className='text-2xl pl-10'>Result</td>
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
                                    <td><p className=' text-xl pr-0'>{gotMarks} &nbsp; marks</p></td>
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

                            </tbody>
                        </table>
                    </div>

                </div>
                    <div className='m-auto flex flex-col rounded-md text-gray-800 text-xl overflow-hidden shadow-2xl'>
                        <h1 data-theme="aqua" className='text-3xl py-10'>Questions</h1>
                        {/* <span className='border-2 border-gray-400 mb-10 w-1/2 m-auto'></span> */}
                        {
                            room.questions.map((element, index) => {
                                if (element.question_type === 'true-false') {
                                    return (
                                        <ShowTrue index={index + 1} question={element.question} marks={element.marks} correct_answer={element.correct_answer} q_id={element.q_id} key={index}></ShowTrue>
                                    )
                                }
                                else if (element.question_type === 'mcq') {
                                    return (
                                        <ShowQuiz key={index} index={index + 1} question={element.question} marks={element.marks} options={element.options} correct_answer={element.correct_answer} q_id={element.q_id}></ShowQuiz>
                                    )
                                }
                                else if (element.question_type === 'fill-blanks') {
                                    return (
                                        <ShowGaps key={index} index={index + 1} question={element.question} marks={element.marks} correct_answer={element.correct_answer} q_id={element.q_id}></ShowGaps>
                                    )
                                }

                            })
                        }
                    </div>
                </div>
            }





            {/* student */}


        </div>
    );
}

export default ExamDetails;



const ShowQuiz = (props) => {
    const { index, question, marks, options, correct_answer, q_id } = props;

    return (
        <div className='flex flex-col gap-10 p-16 py-20 border-y-2 bg-white animate__animated animate__fadeIn'>
            <div className='flex justify-between'>
                <span className='flex gap-5 text-start'>
                    <p className='text-2xl'>{index}.</p>
                    <h3 className='break-all pr-0 font-semibold text-2xl text-justify'>{question} ?</h3>
                </span>
                <p className='font-semibold'>{marks}<span className='text-sm font-normal'> marks</span></p>
            </div>
            <div className='flex flex-col gap-6 pl-9'>
                {
                    options.map((option, index) => {
                        return (
                            <Option option={option.value} key={index} index={index + 1} ></Option>
                        )
                    })
                }
            </div>
            <p className='pt-5'>Answer : <span className='font-semibold'>{correct_answer}</span></p>
        </div>
    )
}

const Option = (props) => {
    const { option, index } = props;

    return (
        <div className="radio-group flex gap-4 items-cente ">
            <p className='min-w-[20px] text-center'>{index}.</p>
            <p className='break-all text-justify'>{option}</p>
        </div>
    )
}
















const ShowGaps = (props) => {
    const { index, question, marks, correct_answer, q_id } = props;


    return (
        <div className='flex flex-col gap-10 p-16 py-20 border-y-2  bg-white animate__animated animate__fadeIn'>
            <div className='flex justify-between'>
                <span className='flex gap-5 text-start'>
                    <p className='text-2xl'>{index}.</p>
                    <h3 className='break-all pr-0 font-semibold text-2xl text-justify'>{question} ?</h3>
                </span>
                <p className='font-semibold'>{marks}<span className='text-sm font-normal'> marks</span></p>
            </div>
            <div className="gap-4 border-cyan-600 border-b-2 w-1/3 ml-10">
                <input disabled className='text-field border-none text-xl rounded-md' type="text" placeholder='answer' autoFocus />
            </div>
            <p className='pt-5'>Answer : <span className='font-semibold'>{correct_answer}</span></p>
        </div>
    )
}















const ShowTrue = (props) => {
    const { index, question, marks, correct_answer, q_id } = props;


    return (
        <div className='flex flex-col gap-10 p-16 py-20 border-y-2  bg-white animate__animated animate__fadeIn'>
            <div className='flex justify-between'>
                <span className='flex gap-5 text-start'>
                    <p className='text-2xl'>{index}.</p>
                    <h3 className='break-all pr-0 font-semibold text-2xl text-justify'>{question} ?</h3>
                </span>
                <p className='font-semibold'>{marks}<span className='text-sm font-normal'> marks</span></p>
            </div>
            <div className='flex flex-col gap-5 pl-10'>
                <div className="radio-group flex gap-4">
                    <p>true</p></div>
                <div className="radio-group flex gap-4">
                    <p>false</p></div>
            </div>
            <p className='pt-5'>Answer : <span className='font-semibold'>{correct_answer}</span></p>
        </div>

    )
}
