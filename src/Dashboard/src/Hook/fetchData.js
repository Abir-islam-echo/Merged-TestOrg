import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";

const FetchData = () => {
  const { validUser } = useAuth();
  const [data, setData] = useState();
  const [barData, setBarData] = useState();
  const [CourseDataUp, setCourseDataUp] = useState();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .post("https://excited-foal-raincoat.cyclic.app/dashboard/examdata", {
          token: validUser.token,
        })
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          console.log(response.data);
          setData(response.data);

          const barChartData = [
            [
              { x: "Test 1", y: 46 },
              { x: "Test 2", y: 27 },
              { x: "Test 3", y: 26 },
            ],
            [
              { x: "Test 1", y: 37 },
              { x: "Test 2", y: 23 },
              { x: "Test 3", y: 18 },
            ],
            [
              { x: "Test 1", y: 21 },
              { x: "Test 2", y: 17 },
              { x: "Test 3", y: 11 },
            ],
          ];

          let j = 0;
          response.data.slice(0, 2).map((singleData) => {
            let i = 0;
            barChartData[i][j].y = singleData.maxMarks;
            barChartData[++i][j].y = singleData.meanMarks;
            barChartData[++i][j].y = singleData.minMarks;
            j++;
          });

          const barCustomSeries = [
            {
              dataSource: barChartData[0],
              xName: "x",
              yName: "y",
              name: "Highest",
              type: "Column",
              marker: {
                dataLabel: {
                  visible: true,
                  position: "Top",
                  font: { fontWeight: "600", color: "#ffffff" },
                },
              },
            },
            {
              dataSource: barChartData[1],
              xName: "x",
              yName: "y",
              name: "Mean",
              type: "Column",
              marker: {
                dataLabel: {
                  visible: true,
                  position: "Top",
                  font: { fontWeight: "600", color: "#ffffff" },
                },
              },
            },
            {
              dataSource: barChartData[2],
              xName: "x",
              yName: "y",
              name: "Lowest",
              type: "Column",
              marker: {
                dataLabel: {
                  visible: true,
                  position: "Top",
                  font: { fontWeight: "600", color: "#ffffff" },
                },
              },
            },
          ];

          const CourseData = [
            {
              CourseName: "Computer Programming",
              CourseCode: "CSE-2110",
              RoomID: 1055,
              TotatStudents: 55,
              TestTaken: 5,
            },
            {
              CourseName: "Digital Logic Design",
              CourseCode: "CSE-2868",
              RoomID: 1434,
              TotatStudents: 434,
              TestTaken: 7,
            },
            {
              CourseName: "Software Development",
              CourseCode: "CSE-3974",
              RoomID: 1987,
              TotatStudents: 987,
              TestTaken: 9,
            },
            {
              CourseName: "Computer Algorithms",
              CourseCode: "CSE-2042",
              RoomID: 1021,
              TotatStudents: 21,
              TestTaken: 5,
            },
            {
              CourseName: "Chemistry",
              CourseCode: "CSE-3128",
              RoomID: 1564,
              TotatStudents: 564,
              TestTaken: 2,
            },
            {
              CourseName: "Physics II ",
              CourseCode: "CSE-2016",
              RoomID: 1008,
              TotatStudents: 8,
              TestTaken: 4,
            },
            {
              CourseName: "Database Management Systems ",
              CourseCode: "CSE-2324",
              RoomID: 1162,
              TotatStudents: 162,
              TestTaken: 8,
            },
            {
              CourseName: "Theory of Computing",
              CourseCode: "CSE-2944",
              RoomID: 1472,
              TotatStudents: 472,
              TestTaken: 3,
            },
            {
              CourseName: "Data Communication",
              CourseCode: "CSE-2458",
              RoomID: 1229,
              TotatStudents: 229,
              TestTaken: 5,
            },
            {
              CourseName: "Compiler",
              CourseCode: "CSE-2206",
              RoomID: 1103,
              TotatStudents: 103,
              TestTaken: 15,
            },
          ];

          // for(let i =0; i<3;i++){
          //   CourseData[i].CourseName = response.data[i].CourseName;
          // }
          let i = 0;
          response.data.slice(0, 2).map((singleData) => {

            CourseData[i].CourseName = singleData.courseName;
            CourseData[i].RoomID = singleData.roomCode;
            CourseData[i].TotatStudents = singleData.totalStudent;
            i++;
          });




          setCourseDataUp(CourseData);

          setBarData(barCustomSeries);
        })
        .catch((error) => {
          console.log("error: " + error);
        });
    };
    fetchData();
  }, [validUser]);

  return {
    data,
    barData,
    CourseDataUp
  };
};

export default FetchData;
