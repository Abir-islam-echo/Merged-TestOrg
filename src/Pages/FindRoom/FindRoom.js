import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import Loader from '../../Loader/Loader';

const FindRoom = () => {
    const [isLoading, setIsLoading] = useState(true)
    setTimeout(() => {
        setIsLoading(false)
    }, 1000)
    const { validUser } = useAuth()
    const [code, getCode] = useState(null);
    const navigate = useNavigate()

    const checkRoom = () => {
        Swal.showLoading()
        async function getRoom() {
            await axios.post(`https://excited-foal-raincoat.cyclic.app/room/join-room`, {
                token: validUser.token,
                roomCode: code,
            })
                .then(response => {
                    // console.log(response);
                    Swal.fire({
                        width: '40vw',
                        icon: 'success',
                        title: `Room available`,
                        text: `${response.data.msg}`,
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: `go to my room`
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/myRooms')
                        }
                    })
                    // if (response.data.msg = 'token invalid') {
                    //     Swal.fire({
                    //         icon: 'error',
                    //         title: `Room not found`,
                    //         text: `please try again`,
                    //     })
                    // }
                    // else {
                    //     Swal.fire({
                    //         width: '40vw',
                    //         icon: 'success',
                    //         title: `Room available`,
                    //         text: `you have successfully joined the room`,
                    //         showCancelButton: true,
                    //         confirmButtonColor: '#3085d6',
                    //         confirmButtonText: `got to my room`
                    //     }).then((result) => {
                    //         if (result.isConfirmed) {
                    //             navigate('/Student/MyRoom')
                    //         }
                    //     })

                    // }
                })
                .catch(err => {
                    // console.log(err)
                    // if()
                    Swal.fire({
                        width: '30vw',
                        icon: `${err.response.data.error == `Room Doesn't exists!!!` ? 'error' : 'warning'}`,
                        text: `${err.response.data.error}`,
                        confirmButtonText: `please try again`
                    })
                });
        }
        getRoom();
    }
    return (
        <div className='container m-auto c-mt py-10 min-h-screen'>
            {
                isLoading ? <div className='pt-48 flex flex-col gap-10'><Loader></Loader><p>please wait...</p></div> :
                    <div>
                        <h1 className='text-3xl font-bold'>Find Your Exam</h1>
                        <div className='text-start pt-20 animate__animated animate__fadeIn'><label htmlFor="input" className='text-xl text-gray-400 font-semibold'>Enter the code that you have given by your teacher</label><input onInput={(e) => getCode(e.target.value)} className='text-xl mt-5 h-14 input border-2  border-cyan-700' type="text" placeholder='ex : 6b42ae56f47tr' /></div>
                        <div className='pt-40 animate__animated animate__fadeInDown'>
                            <button onClick={() => checkRoom()} className='transition-all hover:tracking-widest border-none button-custom bg-gradient-to-tr from-indigo-800 via-cyan-500 to-indigo-800 btn  text-white px-16 hover:bg-indigo-700'>Join &nbsp;room</button>
                        </div>
                    </div>
            }
        </div>
    );
}

export default FindRoom;
