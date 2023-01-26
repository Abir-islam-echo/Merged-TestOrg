import React from 'react'

export default function Row({ id, Name, mark }) {

  const row = {

  }
  return (
    <React.Fragment>
      <tr className={`${id % 2 === 0 ? "bg-gray-200" : "bg-white-50"} py-2`}>
        <td className='text-gray-700 py-2 text-md'>{id}</td>
        <td className='text-gray-700 py-2 text-md'>{Name}</td>
        <td className='text-gray-700 py-2 text-md'>{mark}</td>
      </tr>
    </React.Fragment>

  );
};
