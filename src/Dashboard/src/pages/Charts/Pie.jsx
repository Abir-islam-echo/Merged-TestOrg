import React from 'react';

import { pieChartData } from '../../data/dummy';
import { ChartsHeader, Pie as PieChart, Sidebar } from '../../components';

const Pie = () => (
  <div className='c-mt flex mb-52'>
    <div className="min-w-[18rem] fixed sidebar dark:bg-secondary-dark-bg bg-white z-40 mt-[-67px]">
      <Sidebar />
    </div>
    <div className='min-w-[18rem]'></div>
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-xl w-full shadow-2xl min-h-[770px] animate__animated animate__fadeIn">
      <ChartsHeader category="Pie" title="Catagorization According based on Courses" />

      <PieChart id="chart-pie" data={pieChartData} legendVisiblity height="full" />

    </div>
  </div>

);

export default Pie;
