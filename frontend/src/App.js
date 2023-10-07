import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Home from "./components/Home";
import PrivateComp from "./components/PrivateComp";
import ManageStudents from "./components/ManageStudents";
import Expenses from "./components/Expenses";
import Support from "./components/Support";
import About from "./components/About";


import ManageFees from "./components/ManageFees";
import NewAdmission from "./components/NewAdmission";
import FeeStructure from "./components/FeeStructure";
import FacultyRecord from "./components/FacultyRecord";
import ManageFaculty from "./components/ManageFaculty";
import Setting from "./components/Setting";
import UpdateProfile from "./components/UpdateProfile";
import Newfaculty from "./components/NewFaculty";
import UpdateFaculty from "./components/UpdateFaculty";
import AddSchedule from "./components/AddSchedule";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Rotes for sidebar */}
          <Route element={<PrivateComp />}>
            <Route path="/" element={<Main />}>
              <Route path="" element={<Home />}></Route>
              <Route path="/manage_students" element={<ManageStudents />}></Route>
              <Route path="/manage_expenses" element={<Expenses />}></Route>
              {/* routes for navbar */}
              <Route path="/support" element={<Support />}></Route>
              <Route path="/about" element={<About />}></Route>


              <Route path="/managefees" element={<ManageFees />}></Route>
              <Route path="/newadmission" element={<NewAdmission />}></Route>
              <Route path="/feestructure" element={<FeeStructure />}></Route>
              <Route path="/facultyrecord" element={<FacultyRecord />}></Route>
              <Route path="/managefaculty" element={<ManageFaculty />}></Route>
              <Route path="/setting" element={<Setting />}></Route>
              <Route path="/update_profile" element={<UpdateProfile />}></Route>
              <Route path="/new_faculty" element={<Newfaculty />}></Route>
              <Route path="/update_faculty" element={<UpdateFaculty/>}></Route>
              <Route path="/add_class_schedule" element={<AddSchedule/>}></Route>
            </Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>

        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;
