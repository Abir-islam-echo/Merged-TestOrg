import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';

import { barCustomSeries, barPrimaryXAxis, barPrimaryYAxis } from '../../data/dummy';
import { ChartsHeader, Sidebar } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import useAuth from '../../../../Hooks/useAuth';
import FetchData from '../../Hook/fetchData';
import Loader from '../../../../Loader/Loader';

const Bar = () => {
  const { currentMode } = useStateContext();
  const { barData } = FetchData()

  return (
    <div className='c-mt flex mb-52'>
      <div className="min-w-[18rem] fixed sidebar dark:bg-secondary-dark-bg bg-white z-40 mt-[-67px]">
        <Sidebar />
      </div>
      <div className='min-w-[18rem]'></div>
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-xl w-full shadow-2xl min-h-[770px] animate__animated animate__fadeIn">
        <ChartsHeader category="Bar" title="Marks Comparison of Last 3 Tests" />
        <ChartComponent
          id="charts"
          primaryXAxis={barPrimaryXAxis}
          primaryYAxis={barPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true }}
          background={currentMode === "Dark" ? "#33373E" : "#fff"}
          legendSettings={{ background: "white" }}
        >
          <Inject
            services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}
          />
          {
            barData ? <SeriesCollectionDirective>
              {barData.map((item, index) => (
                <SeriesDirective key={index} {...item} />
              ))}
            </SeriesCollectionDirective> : <span className='flex flex-col pt-64 gap-10'><Loader></Loader><p>Please wait...</p></span>
          }
        </ChartComponent>
      </div>
    </div>

  );
};

export default Bar;
