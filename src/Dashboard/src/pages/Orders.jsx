import React, { useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { CourseData, CourseGrid } from "../data/dummyTO";
import { Header, Sidebar } from "../components";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";

const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: false };
  const { validUser } = useAuth()
  useEffect(() => {
    const fetchData = async () => {
      await axios.post('https://excited-foal-raincoat.cyclic.app/dashboard/examdata', { token: validUser.token })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log('error: ' + error)
        })
    }
    fetchData()
  }, [validUser]);
  return (
    <div className="c-mt flex mb-52">
      <div className="min-w-[18rem] fixed sidebar dark:bg-secondary-dark-bg bg-white z-40 mt-[-67px]">
        <Sidebar />
      </div>
      <div className='min-w-[18rem]'></div>

      <div className="  m-2 md:m-10 mt-20 p-2 md:p-10 bg-blue rounded-3xl w-full">
        <Header category="Page" title="Courses" />
        <GridComponent
          id="gridcomp"
          // dataSource={ordersData}
          dataSource={CourseData}
          allowPaging
          allowSorting
          allowExcelExport
          allowPdfExport
          contextMenuItems={contextMenuItems}
          editSettings={editing}
        //height={315}
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {CourseGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              Resize,
              Sort,
              ContextMenu,
              Filter,
              Page,
              ExcelExport,
              Edit,
              PdfExport,
            ]}
          />
        </GridComponent>
      </div>
    </div>

  );
};
export default Orders;
