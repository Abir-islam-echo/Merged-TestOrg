import React from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-kanban';

import { kanbanData, kanbanGrid } from '../data/dummy';
import { Header, Sidebar } from '../components';

const Kanban = () => (
  <div className='c-mt flex mb-52'>
    <div className="min-w-[18rem] fixed sidebar dark:bg-secondary-dark-bg bg-white z-40 mt-[-67px]">
      <Sidebar />
    </div>
    <div className='min-w-[18rem]'></div>

      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl w-full shadow-2xl min-h-[770px]">
        <Header category="App" title="Kanban" />
        <KanbanComponent
          id="kanban"
          keyField="Status"
          dataSource={kanbanData}
          cardSettings={{ contentField: "Summary", headerField: "Id" }}
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {kanbanGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
        </KanbanComponent>
      </div>
  </div>

);

export default Kanban;
