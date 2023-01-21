import React from 'react';

import { ChartsHeader, Stacked as StackedChart, Sidebar } from '../../components';

const Stacked = () => (
  <div className='c-mt flex mb-52'>
    <div className="min-w-[18rem] fixed sidebar dark:bg-secondary-dark-bg bg-white z-40 mt-[-67px]">
      <Sidebar />
    </div>
    <div className='min-w-[18rem]'></div>
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl w-full">
      <ChartsHeader category="Stacked" title="Semester Report Analysis" />
      <StackedChart />
    </div>
  </div>
);

export default Stacked;
