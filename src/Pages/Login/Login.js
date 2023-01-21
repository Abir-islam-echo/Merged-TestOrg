
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import "./Login.scss"
const Login = () => {
    const navigate = useNavigate()
    const { state } = useLocation();
    const { value } = state

    const { validUser, sendData, token, resend, setResend, isLoading, setIsLoading } = useAuth()

    const [isSignIn, setisSignIn] = useState(value);
    const { register, handleSubmit, reset } = useForm();
    const [passwordShown, setPasswordShown] = useState(false);
    if (!useLocation().state) {
        Swal.fire({
            title: 'Something went wrong',
            icon: 'error',
            text: 'please try again later',
            confirmButtonText: 'back to homepage',
        }).then(() => {
            window.location.assign(`${window.location.origin}/home`);
        })
    }

    useEffect(() => {
        if (validUser?.userName) {
            if (validUser?.usertype == "student") {
                navigate("/student")
            }
            else {
                navigate("/home")
            }
        }
    }, [validUser])

    // Password toggle handler
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    // signup submit
    const onSubmit = (submitted_data, e) => {
        setIsLoading(true)
        let user;
        if (e.target.name === 'login') {
            if (!submitted_data.loginEmail || !submitted_data.loginPassword) {
                setIsLoading(false);
                toast.error('please, fill-up the information', {
                    autoClose: 2000,
                    toastId: 'customId',
                    position: "bottom-right",
                    theme: 'colored'
                });
            }
            else {
                user = {
                    method: 'login',
                    email: submitted_data.loginEmail,
                    password: submitted_data.loginPassword
                }
                sendData(user)
                reset();
            }
        }

        else if (e.target.name === 'signup') {
            if (!submitted_data.email || !submitted_data.password || !submitted_data.username) {
                setIsLoading(false);
                toast.error('please, fill-up the information', {
                    autoClose: 2000,
                    toastId: 'customId',
                    position: "top-left",
                    theme: 'colored'

                });
            }
            else {
                // console.log('user created');
                user = {
                    method: 'signup',
                    email: submitted_data.email,
                    password: submitted_data.password,
                    usertype: submitted_data.profession,
                    username: submitted_data.username
                }
                if (!resend) {
                    sendData(user)
                    reset();
                }
                else if (resend) {
                    setIsLoading(true)
                    const reSend = async () => {
                        axios.post(`https://testorg-backend-service.onrender.com/resend-mail`, { email: submitted_data.email })
                            .then(response => {
                                setIsLoading(false)
                                toast.success(`${response.data.msg}`, {
                                    position: "top-left",
                                    autoClose: 2000,
                                    theme: "light",
                                    toastId: 'customId',
                                })

                            })
                            .catch(error => {
                                setIsLoading(false)
                                toast.error(`${error.response.data.error}`)

                            })
                    }
                    reSend();
                }
            }
        }
    };


    return (
        <div className='c-mt'>
            <div className={isSignIn ? 'containerr mb-0 nb-custom' : 'containerr sign-up-mode mb-0 nb-custom'}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <form onSubmit={handleSubmit(onSubmit)} name='login' className="sign-in-form" id='sign-in-form'>
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="email" placeholder="Email" {...register('loginEmail')} className="login-email" />
                            </div>
                            <div className="input-field relative">
                                <i className="fas fa-lock"></i>
                                <div className='m-0 p-0 flex'>
                                    <input type={passwordShown ? "text" : "password"} placeholder="Password" {...register('loginPassword')} className='login-password p-0' />
                                    <i title='show password' onClick={togglePassword} class={`absolute right-4 fas fa-solid fa-eye-slash cursor-pointer ${passwordShown ? 'hidden' : ''}`}></i>
                                    <i title='hide password' onClick={togglePassword} class={`absolute right-4 fas fa-solid fa-eye cursor-pointer ${!passwordShown ? 'hidden' : ''}`}></i>
                                </div>
                            </div>
                            <div className=" mt-10 mb-5 p-0 relative overflow-hidden rounded-[49px] h-[49px]">
                                <input name='signin' type="submit" value="Login" className='btnn solid text-center hover:scale-105 hover:tracking-[2px] bg-gradient-to-tr from-indigo-800 via-cyan-500 button-custom overflow-hidden' />
                                {
                                    isLoading && <div class="loaderb m-0 absolute bottom-[-3px]">
                                        <div class="loaderBar"></div>
                                    </div>
                                }
                            </div>

                            <p className="social-text">Or Sign in with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <i className="fab fa-google"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </form>
                        <form name='signup' onSubmit={handleSubmit(onSubmit)} className="sign-up-form" id='sign-up-form'>
                            <h2 className="title">Sign up</h2>
                            <div className="input-field flex text-center justify-between align-middle">
                                <span className='w-full flex justify-between text-center cs align-middle'><i className="fas fa-chalkboard-user ci"></i>
                                    <h6 className='whitespace-nowrap'>sign up as</h6></span>
                                <span className='text-end'>
                                    <select {...register("profession")} >
                                        <option value="teacher">Teacher</option>
                                        <option value="student">Student</option>
                                    </select>
                                </span>
                            </div>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Username" {...register('username')} className="signup-username" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="email" placeholder="Email" {...register('email')} className="signup-email" />
                            </div>
                            <div className="input-field relative">
                                <i className="fas fa-lock"></i>
                                <div className='m-0 p-0 flex justify-between'>
                                    <input type={passwordShown ? "text" : "password"} placeholder="Password" {...register('password')} className='signup-password p-0' />
                                    <i title='hide password' onClick={togglePassword} class={`absolute right-4 fas fa-solid fa-eye cursor-pointer ${!passwordShown ? 'hidden' : ''}`}></i>
                                    <i title='show password' onClick={togglePassword} class={`absolute right-4 fas fa-solid fa-eye-slash cursor-pointer ${passwordShown ? 'hidden' : ''}`}></i>
                                </div>
                            </div>
                            {
                                resend && <div className='mb-[-20px] mt-5 text-lg'><p className='text-gray-500'>didn't get a mail?</p></div>
                            }
                            <div className="mt-10 mb-5 p-0 relative overflow-hidde rounded-[49px] h-[49px]">
                                <input name='signup' type="submit" className="btnn bg-gradient-to-tr from-indigo-800 via-cyan-500 to-indigo-800 button-custom hover:scale-105 hover:tracking-[2px]" value={resend ? "resend mail" : "Sign up"} />
                                {
                                    isLoading && <div class="loaderb m-0 absolute bottom-[-3px]">
                                        <div class="loaderBar"></div>
                                    </div>
                                }
                            </div>

                            <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media">
                                <a href="#" className="social-icon">
                                    <i className="fab fa-google"></i>
                                </a>
                                <a href="#" className="social-icon">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </form>

                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>
                                “ Welcome to the TestOrg Family! You are just a step away from getting an elite experience of the best online exam portal! ”
                            </p>
                            <button onClick={() => setisSignIn(false)} className="btnn transparent hover:text-gray-800 animate-pulse" id="sign-up-btn">
                                Sign up
                            </button>
                        </div>
                        <img src="../files/Secure login-rafiki.svg" className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>
                                “ Welcome Back! Sign in to feel our smoothest experience! ”
                            </p>
                            <button onClick={() => setisSignIn(true)} className="btnn transparent hover:text-gray-800 animate-pulse" id="sign-in-btn">
                                Sign in
                            </button>
                        </div>
                        <img src="../files/Sign up-amico.svg" className="image" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

