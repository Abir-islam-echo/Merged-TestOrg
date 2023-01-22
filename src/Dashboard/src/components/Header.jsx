import React, { useContext } from 'react';
import { useStateContext } from '../contexts/ContextProvider';

const Header = ({ category, title }) => {
  const { currentColor } = useStateContext()
  return (

    <div data-theme="garden" className={`mb-10 py-5 rounded-md shadow-xl`}>
      {/* <p className="text-lg text-gray-400">{category}</p> */}
      <p className="text-3xl font-bold tracking-tight">
        {title}
      </p>
    </div>
  );
}

export default Header;


