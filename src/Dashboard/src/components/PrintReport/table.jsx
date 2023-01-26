import {getTestData} from '../../data/student_marks'
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';

import React from 'react'
import Row from './row_render';

export default function Table() {
   const marks = getTestData();
   const ref = useRef();
  return (
    <div className="container m-auto c-mt min-h-screen mb-96">
      <div ref={ref} className="mb-20">
        <div className='mb-10'>
          <div class="flex justify-center mb-10">
            <div class=" p-6 rounded-lg  bg-white w-96">
              <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2 mt-5">
                Exam Name: Physics
              </h5>
              <p class="text-gray-700 text-base mt-2 mb-4">
                <p>Course Instructor: Jamil As ad</p>
                <p>Test Type : Class Test</p>
                <p>Test Date: 20/05/2022</p>
              </p>
            </div>
          </div>

          {/* <h1>Exam Name: Physics</h1>
          <p>Course Instructor: Jamil As ad</p>
          <p>Test Type : Class Test</p>
          <p>Test Date: 20/05/2022</p> */}
        </div>

        <table data-theme="corporate" className="mx-auto px-4 w-4/5 shadow-2xl">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 font-semibold tracking-wide text-lg text-gray-800">ID</th>
              <th className="p-3 font-semibold tracking-wide text-lg text-gray-800">NAME</th>
              <th className="p-3 font-semibold tracking-wide text-lg text-gray-800">Marks</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((item) => (
              <Row
                key={item.StudentID}
                id={item.StudentID}
                Name={item.Name}
                mark={item.marks}
              />
            ))}
          </tbody>
        </table>
      </div>

      <ReactToPrint
        trigger={() => (
          <button className="bg-blue-500 hover:bg-blue-700 text-white mt-5 font-bold py-2 px-4 rounded">
            Print Report
          </button>
        )}
        content={() => ref.current}
      ></ReactToPrint>
    </div>
  );
}
