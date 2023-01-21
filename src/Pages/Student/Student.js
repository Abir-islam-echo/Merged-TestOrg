import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const StudentEntry = () => {


    return (
        <div className='c-mt container m-auto min-h-screen'>
            <div className='flex justify-center'>
                <img className='' src='../files/join room.gif' />
            </div>
            <div className='flex flex-col md:flex-row md:justify-around md:pt-20 gap-10 animate__animated animate__fadeInDown'>
                <div>
                    <Link to={'/MyRooms'} className='border-0 button-custom bg-gradient-to-bl from-indigo-800 via-cyan-500 to-indigo-800 btn  text-white px-16 hover:bg-indigo-700'>My Rooms</Link>
                </div>
                <div>
                    <Link to={"/Join_Room"} className='border-0 button-custom bg-gradient-to-bl from-indigo-800 via-cyan-500 to-indigo-800 btn  text-white px-16 hover:bg-indigo-700'>Join Room</Link>
                </div>
            </div>
        </div>
    );
}

export default StudentEntry;
