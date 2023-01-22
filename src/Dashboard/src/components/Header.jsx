import React from 'react';

const Header = ({ category, title }) => (
  <div className=" mb-10 bg-blue-300 py-5 rounded-md bg-gradient-to-r from-indigo-800 via-cyan-500 to-indigo-800 nb-custom">
    {/* <p className="text-lg text-gray-400">{category}</p> */}
    <p className="text-3xl font-bold tracking-tight text-slate-50">
      {title}
    </p>
  </div>
);

export default Header;
