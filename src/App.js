import './App.css';
import React, { useEffect, useState } from 'react'
import Header from './Pages/Shared/Header/Header';
import Footer from './Pages/Shared/Footer/Footer';
import Home from './Pages/Home/Home';
import Invalid from './Pages/Invalid/Invalid';
import Login from './Pages/Login/Login';
import Mcq from './Pages/Questions/Mcq/Mcq';
import Form_test from './Form_test/Form_test';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider from './Context/AuthProvider';
import Exam from './Pages/Exam/Exam';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Room from './Pages/Room/Room';
import Timer from './Timer/Timer';
import FindRoom from './Pages/FindRoom/FindRoom';
import Student from './Pages/Student/Student';
import MyRooms from './Pages/MyRooms/MyRooms';
import useAuth from './Hooks/useAuth';
import MyProfile from './Pages/MyProfile/MyProfile';
import Confirmed from './Pages/Confirmed/Confirmed';
import ExamDetails from './Pages/ExamDetails/ExamDetails';
import Dash from './Dashboard/src/Dash';
import { ContextProvider } from "../src/Dashboard/src/contexts/ContextProvider";
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,

} from "../src/Dashboard/src/pages";

function App() {
console.log('asdvarsf efer gf')
  const [firstTime, setFirstTime] = useState(true)
  const [footer, setFooter] = useState(true)
  // console.log(window.location)
  window.addEventListener('onDomChange', () => {
    alert("The Times They Are a-Changin'");
  })
  // onDomChange(function () {
  //     alert("The Times They Are a-Changin'");
  // });

  useEffect(() => {
    console.log('ada')
    const string = "/Dash/ecommerce"
    if (firstTime) {
      if (string.includes(window.location.pathname.replace('/', ''))) {
        setFooter(false)
        setFirstTime(false)
        console.log('yes')
      }
      else {
        setFirstTime(false)
        setFooter(true)
      }

    }
  }, [window.location]);

  return (
    <div className="App bg-gray-100">
      <AuthProvider>
        <ContextProvider>
          <BrowserRouter>
            <Header />
            <Routes >
              <Route path="/" element={<Home />} />
              <Route path="/myProfile" element={<MyProfile />} />
              <Route path="/student" element={<Student />} />
              <Route path="/myRooms" element={<MyRooms />} />
              <Route path="/student/timer" element={<Timer />} />
              <Route path="/join_Room" element={<FindRoom />} />
              <Route path="/home" element={<Home />} />
              <Route path="/room" element={<Room />} />
              <Route path="/form_test" element={<Form_test />} />
              <Route path="/student/exam" element={<Exam />} />
              <Route path="/login" element={<Login />} />
              <Route path="/confirmed" element={<Confirmed />} />
              <Route path="/examDetails" element={<ExamDetails />} />
              <Route path="*" element={<Invalid />} />

              {/* sk */}
              <Route path="/Dash" element={<Dash />} />
              <Route path="/ecommerce" element={<Dash />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/customers" element={<Customers />} />

              {/* apps  */}
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/color-picker" element={<ColorPicker />} />

              {/* charts  */}

              <Route path="/line" element={<Line />} />
              <Route path="/area" element={<Area />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/financial" element={<Financial />} />
              <Route path="/color-mapping" element={<ColorMapping />} />
              <Route path="/pyramid" element={<Pyramid />} />
              <Route path="/stacked" element={<Stacked />} />
              {/* sk */}
            </Routes>
            <Footer />
            <ToastContainer />
          </BrowserRouter>
        </ContextProvider>
      </AuthProvider>

    </div>
  );
}

export default App;
