import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useLogin from '../../../Hooks/useLogin';

const Fill_gaps = (props) => {
    const [cross, setCross] = useState(true)
    const [done, setDone] = useState(false)
    const { q_id, setQuestionFormData, questionFormData, deleteQuestion, index, setIsValidQsn, totalMarks, setTotalMarks, addQuestion, questionForm, setQuestionForm } = props
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        if ((data.correct_answer) && (data.question) && (data.marks)) {
            data.question_type = 'fill-blanks'
            data.q_id = q_id;

            // let arr = [...questionFormData];
            // arr[index - 1] = data
            // setQuestionFormData(arr)
            setQuestionFormData([...questionFormData, data])
            setDone(true)
            setIsValidQsn(true)
            setTotalMarks(totalMarks + parseInt(data.marks))
            setCross(false)
        }
        else {
            toast.error('fill up the empty fields', {
                autoClose: 2000,
                toastId: 'customId',
                theme: 'colored'
            });
        }
    }
    const editQuestion = (q_id) => {
        const index = questionFormData.filter(question => {
            return question.q_id == q_id
        })
        setTotalMarks(totalMarks - parseInt(questionFormData[questionFormData.indexOf(index[0])].marks))
        questionFormData.splice(questionFormData.indexOf(index[0]), 1)
        setDone(false)

    }


    const crossClick = (q_id) => {

        const filterForShow = questionForm.filter((question) => {
            return question.q_id !== q_id;
        });
        setQuestionForm(filterForShow);
        setIsValidQsn(true)
    }
    return (
        <div className='shadow-lg rounded-md border-t-8 border-t-cyan-600 text-slate-500 bg-white pt-5 animate__animated animate__fadeIn'>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-md question-form px-8" name='fill-blanks'>
                <div className='flex items-center pb-5 w-full justify-between'>
                    <span></span>
                    <h2 className="title font-semibold"><span className=' text-slate-400'>fill </span>blanks</h2>
                    <div className={`${done && "contents"}`}>
                        {
                            cross && <span title='cancel' onClick={() => { crossClick(q_id) }} className='px-2 flex items-center justify-center rounded-md hover:bg-slate-200 transition-all cursor-pointer hover:text-orange-600'><i class="fas fa fa-close text-3xl"></i></span>
                        }
                    </div>
                    <div className='contents'>
                        {
                            done && <span tabIndex={0} title="options" className='dropdown dropdown-left  px-2 py-1 rounded-md hover:bg-slate-200 transition-all cursor-pointer hover:text-cyan-600'><i class="fas fa-duotone fa-sliders text-xl">
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-40">
                                    <li onClick={() => { deleteQuestion(q_id) }} className='text-gray-400 t-lowercase'>
                                        <span className='flex items-center justify-between'>
                                            <span className='text-sm tracking-[2px]'>delete</span><span><i class="fas fa-solid fa-trash-can text-cyan-500"></i></span>
                                        </span>
                                    </li>
                                    <li onClick={() => { editQuestion(q_id) }} className='text-gray-400'><span className='flex items-center justify-between'><span className='text-sm tracking-[2px]'>edit</span><span><i class="fas fa-duotone fa-pen-to-square text-cyan-500"></i></span></span></li>
                                    <li onClick={() => { addQuestion('fill-blanks') }} className='text-gray-400'>
                                        <span className='flex items-center justify-between'>
                                            <span className='text-sm tracking-[2px]'>copy</span>
                                            <span><i class="fa-duotone fa-copy text-cyan-500"></i></span>
                                        </span>
                                    </li>
                                </ul>
                            </i></span>
                        }
                    </div>
                </div>
                <div className="mcq-question-content container py-1 flex flex-col gap-10 animate__animated animate__slideInRight animate__faster">
                    <div className="question-and-marks flex py-2  gap-5 w-full items-center">
                        <span className=' text-3xl'>{`${index}.`}</span>
                        <div className="field-with-floating-label w-4/5">
                            <input className={`w-full question rounded-md  border-cyan-600 p-2 py-3 form-check ${done ? `pointer-events-none` : ``}`} type="text" placeholder='Question here' {...register('question')} />
                        </div>
                        <div className="field-with-floating-label w-1/5">
                            <input min="1" className={`marks rounded-md  border-cyan-600 outline-0 p-2 py-3 w-full ${done ? `pointer-events-none` : ``}`} type="number" placeholder='marks here' {...register('marks')} />
                        </div>
                    </div>
                    <div className="radio-options max-w-xl flex flex-col gap-2 pl-[44px]">
                        <div className="option-field">
                            {/* <div className="numbering ">
                                <p>1.</p>
                            </div> */}
                            <input className={`text-field text-xl rounded-md  border-cyan-600 ${done ? `pointer-events-none` : ``}`} type="text" placeholder='answer' {...register('correct_answer')} />
                        </div>
                    </div>
                </div>
                {
                    done ? <span className='py-3 px-6 mx-20 my-10'></span> : <input type="submit" className="cursor-pointer inline-block text-white btn bg-gray-500 hover:bg-gray-700 rounded-md py-3 px-6 mx-20 my-10 animate-pulse" value="done" />
                }
            </form>
        </div>
    );
};

export default Fill_gaps;


