import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import { Header, Sidebar } from '../components';

const Customers = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete'];
  const editing = { allowDeleting: true, allowEditing: true };

  return (

    <div className='c-mt flex mb-52'>
      <div className="min-w-[18rem] fixed sidebar dark:bg-secondary-dark-bg bg-white z-40 mt-[-67px]">
        <Sidebar />
      </div>
      <div className='min-w-[18rem]'></div>

      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl w-full shadow-2xl min-h-[770px] animate__animated animate__fadeInLeft">
        <Header category="Page" title="Students" />
        <GridComponent
          dataSource={customersData}
          enableHover={false}
          allowPaging
          pageSettings={{ pageCount: 5 }}
          selectionSettings={selectionsettings}
          toolbar={toolbarOptions}
          editSettings={editing}
          allowSorting
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {customersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      </div>
    </div>

  );
};

export default Customers;


