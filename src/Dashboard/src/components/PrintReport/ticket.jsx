import React from 'react'
import logo from '../assets/f.png'

export default function Ticket() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 space-y-4">
      <div className="max-w-sm mx-auto p-8 bg-white rounded-xl shadow-md space-y-2">
        <img
          className="h-24 mx-auto rounded-full ring-4 ring-green-400"
          src={logo}
        />
        <div className="text-center ">
          <p className="text-lg text-black font-semibold">Learn with sk</p>
          <p className=" text-gray-500 font-medium">Its the Enigma</p>
        </div>
        <button className="px-4 py-1 border border-purple-200 rounded-full text-sm  text-purple-600 font-semibold">
          {" "}
          Visit Now
        </button>
      </div>
    </div>
  );
}
