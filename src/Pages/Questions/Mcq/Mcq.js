
import { SanitizerRounded } from '@mui/icons-material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import './Mcq.css'

const Mcq = (props) => {
    const [cross, setCross] = useState(true)
    const [done, setDone] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState()
    const [optionArray, setOptionArray] = useState([])
    const [options, setOptions] = useState([{ id: 'wn2' }, { id: 'qw1' }])
    const { q_id, setQuestionFormData, questionFormData, deleteQuestion, index, setIsValidQsn, totalMarks, setTotalMarks, addQuestion, questionForm, setQuestionForm } = props
    const { register, handleSubmit } = useForm();

    const addOption = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for (let i = 0; i < 3; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        setOptions((previous) => {
            return [...previous, { id: result }]
        })
    }
    // delete option
    const deleteOption = (id) => {

        const filtered_options = options.filter((option) => {
            return option.id !== id;
        })
        setOptions(filtered_options)

        const filtered = optionArray.filter((option) => {
            return option.id !== id;
        })
        setOptionArray(filtered)
    }

    const onSubmit = (data) => {
        const test = () => {
            for (let option of optionArray) {

                if ((option.value.length <= 0)) {
                    return false
                }
            }
            return true;
        }

        if (test() && (data.question) && (data.marks) && (options.length == optionArray.length)) {
            // console.log(correctAnswer)
            if (correctAnswer) {
                setCross(false)
                data.options = optionArray;
                const indexForCorrect = optionArray.filter(option => {
                    return option.id == correctAnswer
                })
                data.correct_answer = indexForCorrect[0].value;
                data.question_type = 'mcq'
                data.q_id = q_id;
                setQuestionFormData([...questionFormData, data])
                setDone(true)
                setIsValidQsn(true)
                setTotalMarks(totalMarks + parseInt(data.marks))
                // console.log(data)
            }
            else {
                toast.error('select at-least one option', {
                    autoClose: 2000,
                    toastId: 'customId',
                    theme: 'colored'
                });
            }
        }
        else {
            toast.error('fill up the empty fields', {
                autoClose: 2000,
                toastId: 'customId',
                theme: 'colored'
            });

        }

    };

    const crossClick = (q_id) => {
        const filterForShow = questionForm.filter((question) => {
            return question.q_id !== q_id;
        });
        setQuestionForm(filterForShow);
        setIsValidQsn(true)
    }

    const editQuestion = (q_id) => {
        const index = questionFormData.filter(question => {
            return question.q_id == q_id
        })
        setTotalMarks(totalMarks - parseInt(questionFormData[questionFormData.indexOf(index[0])].marks))
        questionFormData.splice(questionFormData.indexOf(index[0]), 1)
        setDone(false)

    }
    return (
        <div className='shadow-lg rounded-md border-t-8 border-t-cyan-600 text-slate-500 bg-white pt-5 animate__animated animate__fadeIn'>
            {/* mcq */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-md question-form px-8" name='mcq'>
                <div className='flex items-center pb-5 w-full justify-between px-5'>
                    <span></span>
                    <h2 className="title font-semibold"><span className=' text-slate-400'>M</span>CQ</h2>
                    <div className={`${done && "contents"}`}>
                        {
                            cross && <span title='cancel' onClick={() => { crossClick(q_id) }} className='px-2 flex items-center justify-center rounded-md hover:bg-slate-200 transition-all cursor-pointer hover:text-orange-600'><i class="fas fa fa-close text-3xl"></i></span>
                        }
                    </div>
                    <div className=' contents'>
                        {
                            done && <span tabIndex={0} title="options" className='dropdown dropdown-left  px-2 py-1 rounded-md hover:bg-slate-200 transition-all cursor-pointer hover:text-cyan-600'><i class="fas fa-duotone fa-sliders text-xl">
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-40">
                                    <li onClick={() => { deleteQuestion(q_id) }} className='text-gray-400 t-lowercase'>
                                        <span className='flex items-center justify-between'>
                                            <span className='text-sm tracking-[2px]'>delete</span><span><i class="fas fa-solid fa-trash-can text-cyan-500"></i></span>
                                        </span>
                                    </li>
                                    <li onClick={() => { editQuestion(q_id) }} className='text-gray-400'><span className='flex items-center justify-between'><span className='text-sm tracking-[2px]'>edit</span><span><i class="fas fa-duotone fa-pen-to-square text-cyan-500"></i></span></span></li>
                                    <li onClick={() => { addQuestion('mcq') }} className='text-gray-400'>
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
                            <input className={`w-full question rounded-md border-cyan-600 p-2 py-3 form-check ${done ? `pointer-events-none` : ``}`} type="text" placeholder='Question here' {...register('question')} />
                        </div>
                        <div className="field-with-floating-label w-1/5">
                            <input min="1" className={`marks rounded-md border-cyan-600 outline-0 p-2 py-3 w-full ${done ? `pointer-events-none` : ``}`} type="number" placeholder='marks here' {...register('marks')} />
                        </div>
                    </div>

                    <div className="left flex flex-col gap-2 radio-options lg:w-1/2 pl-[1px]">
                        {
                            options.map((option, index) => {
                                return <Option options={options} key={option.id} index={index + 1} id={option.id} deleteOption={deleteOption} setCorrectAnswer={setCorrectAnswer} optionCount={options.length} optionArray={optionArray} setOptionArray={setOptionArray} done={done}></Option>
                            })
                        }

                    </div>
                    {
                        done ? <div></div> : <div className='text-start'>
                            <span onClick={() => addOption()} className=" btnborder-none hover:opacity-80 hover:text-black bg-gradient-to-tr from-indigo-800 to-cyan-600 rounded-md py-3 px-6 mx-8 add-option cursor-pointer text-white text-center">
                                add option &nbsp;&nbsp; <i class="fas fa-thin fa-square-plus"></i>
                            </span>
                        </div>
                    }
                </div>
                {
                    done ? <span className='py-3 px-6 mx-20 my-10'></span> : <input type="submit" className="cursor-pointer inline-block text-white btn bg-gray-500 hover:bg-gray-700 rounded-md py-3 px-6 mx-20 my-10 animate-pulse" value="done" />
                }

            </form>
        </div>
    );
};

export default Mcq;


// option field
const Option = (props) => {
    const { id, deleteOption, setCorrectAnswer, optionArray, setOptionArray, index, done, options } = props
    const inputValue = (e) => {

        let arr = [...optionArray];

        const indexOfOption = optionArray.filter(option => {
            return option.id == id
        })
        if (optionArray.indexOf(indexOfOption[0]) == -1) {
            arr.push({ id: id, value: e })
        }
        else {
            arr[optionArray.indexOf(indexOfOption[0])] = { id: id, value: e }
        }
        setOptionArray(arr)

    }
    return (
        <div>
            <div className="option-field w-full">
                {/* <div className="numbering">
                    <p>{`${index}.`}</p>
                </div> */}
                <input onInput={(e) => setCorrectAnswer(e.target.value)} type="radio" name="radio" className={`radio-field radio border-2
                
                 border-cyan-600 radio-accent ${done ? `pointer-events-none` : ``}`} value={id} />
                <input onInput={(e) => inputValue(e.target.value)} className={`text-field animate__animated animate__slideInRight animate__faster rounded-md border-cyan-600  ${done ? `pointer-events-none` : ``}`} type="text" placeholder={`option ${index}`} />
                {
                    (done || options.length <= 2) ? <div></div> : <span onClick={() => deleteOption(id)} className="delete-option transition-all hover:scale-105 " title='delete'>
                        <i class="fas fa-solid fa-trash-can text-orange-600 opacity-50 hover:opacity-100 hover:text-orange-600 transition-all"></i>
                    </span>
                }
            </div>
        </div>
    )
}