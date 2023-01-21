import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from '../../Hooks/useAuth';
import Loader from '../../Loader/Loader';
import SingleRoom from '../SingleRoom/SingleRoom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MyRooms = () => {
    const navigate = useNavigate()
    const { validUser } = useAuth()
    const [rooms, setRooms] = useState(null)
    useEffect(() => {
        const fetchRooms = async () => {
            await axios.post(`https://excited-foal-raincoat.cyclic.app/room/my-room`, { token: validUser?.token })
                .then(response => {
                    if (response.data[0].myRooms.length == 0) {
                        if (validUser.usertype == "teacher") {
                            Swal.fire({
                                title: "You didn't create any exam yet",
                                icon: "warning",
                            }).then(() => {
                                navigate("/student");
                            })
                        }
                        else {
                            Swal.fire({
                                title: "You didn't attend any exam yet",
                                icon: "warning",
                            }).then(() => {
                                navigate("/student");
                            })
                        }

                    }

                    setRooms(response.data[0].myRooms)
                })
                .catch(err => {
                    toast.error(err.response, {
                        toastId: 'customId',
                        position: 'top-right',
                        theme: 'colored',
                        autoClose: 2000,
                    })
                });
        }
        fetchRooms()
    }, [validUser])

    return (
        <div className='c-mt container m-auto min-h-screen pt-10 pb-48'>
            <div className=''>
                {
                    rooms ? <div className='m-auto text-center' >
                        <div className='w-full shadow-md rounded-lg p-4 text-start mb-20 border-l-cyan-700 border-l-8 '>
                            <h1 className='animate__animated  animate__fadeInRight text-4xl font-semibold'>My rooms <span className='text-lg text-stone-500'> ( {rooms.length} {(rooms.length < 2) ? 'exam' : 'exams'} )</span></h1>
                        </div>
                        <div className='flex flex-wrap gap-y-16 justify-betwee gap-x-44 m-auto'>
                            {
                                rooms.map((room, index) => {
                                    return (
                                        <SingleRoom room={room} setRooms={setRooms} key={index}></SingleRoom>
                                    )
                                })
                            }
                        </div>
                    </div> : <div className='pt-72 m-auto flex flex-col items-center justify-center gap-10'><Loader /> <h1>Getting Room Data ...</h1></div>
                }
            </div>
        </div>
    );
}

export default MyRooms;


