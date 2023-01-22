import React from 'react';

import { ChartsHeader, LineChart, Sidebar } from '../../components';

const Line = () => (

  <div className='c-mt flex mb-52'>
    <div className="min-w-[18rem] fixed sidebar dark:bg-secondary-dark-bg bg-white z-40 mt-[-67px]">
      <Sidebar />
    </div>
    <div className='min-w-[18rem]'></div>
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-xl w-full shadow-2xl min-h-[770px]">
      <ChartsHeader category="Line" title="Test Summary" />
      <LineChart />
    </div>
  </div>

);

export default Line;
