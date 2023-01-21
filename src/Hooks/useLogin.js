import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
axios.defaults.withCredentials = true
const useLogin = () => {

    const [validUser, setValidUser] = useState({})
    const [resend, setResend] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const instance = axios.create({
        withCredentials: true
    })
    async function sendData(data) {
        if (data) {
            if (data.method === 'login') {
                await instance.post(`https://excited-foal-raincoat.cyclic.app/login`, data, { withCredentials: true })
                    .then(response => {
                        setIsLoading(false);

                        setValidUser({
                            userName: response.data.name,
                            userMail: response.data.email,
                            token: response.data.token,
                            usertype: response.data.usertype
                        })
                        localStorage.setItem('user', JSON.stringify({
                            userName: response.data.name,
                            userMail: response.data.email,
                            token: response.data.token,
                            usertype: response.data.usertype
                        }))

                        toast.success(`Hello ${response.data.name}`, {
                            autoClose: 2000,
                            toastId: 'customId',
                            position: 'top-right',
                            theme: 'colored'
                        })
                        cookies.set('jwt', response.data.token, { maxAge: 60 * 60 * 24 * 3 });
                    })
                    .catch(err => {
                        setIsLoading(false);
                        toast.error(err.response.data.error, {
                            autoClose: 2000,
                            toastId: 'customId',
                            position: 'top-right',
                            theme: 'colored'
                        })
                    })

            }
            else if (data.method === 'signup') {
                await axios.post(`https://testorg-backend-service.onrender.com/signup`, data)
                    .then(response => {
                        // console.log(response);
                        setIsLoading(false);
                        toast.success(response.data.msg, {
                            autoClose: 5000,
                            toastId: 'customId',
                            position: 'top-left',
                            theme: 'colored'
                        })
                        setResend(true)

                    })
                    .catch(err => {
                        setResend(false)
                        setIsLoading(false);
                        toast.error(err.response.data.error, {
                            autoClose: 3000,
                            toastId: 'customId',
                            position: 'top-left',
                            theme: 'colored'
                        })
                    });
            }
        }
        else
            toast.error('something went wrong!! try again', {
                autoClose: 2000,
                theme: 'colored'
            });
    }
    useEffect(() => {
        if (localStorage.getItem('user')) {
            setValidUser({
                userName: JSON.parse(localStorage.getItem('user')).userName,
                userMail: JSON.parse(localStorage.getItem('user')).userMail,
                token: JSON.parse(localStorage.getItem('user')).token,
                usertype: JSON.parse(localStorage.getItem('user')).usertype,
            })
        }
    }, [])
    async function logout() {

        setValidUser(null)
        localStorage.clear()
        toast.warning('logged out', {
            autoClose: 2000,
            toastId: 'customId',
        })


        await axios.get(`https://excited-foal-raincoat.cyclic.app//logout`)
            .then(response => {
                // console.log(response);
                cookies.remove('jwt');
            })
            .catch(err => {
                toast.error(err.response.data.error, {
                    toastId: 'customId',
                    position: 'top-right',
                    theme: 'colored',
                    autoClose: 2000,
                })
            });
    }

    return {
        sendData,
        validUser,
        logout,
        resend,
        setResend,
        isLoading,
        setIsLoading
    };

};

export default useLogin;