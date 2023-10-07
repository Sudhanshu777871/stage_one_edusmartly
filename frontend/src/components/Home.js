import React, { useState, useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import "./css/Home.css";
function Home() {
  // USESTATE FOR SHOWING TEH DATA OF STUDENTS
  const [numberStudent, setNumberStudents] = useState(0);
  const [numberTeachers, setNumberTeachers] = useState(0);
  const [numberWorkers, setNumberWorkers] = useState(0);
  var CanvasJSChart = CanvasJSReact.CanvasJSChart;

  // FUNCTION OF FETCHING THE NUMBER OF STUDNETS
  const getStudentStrength = async () => {
    let getAPi = await fetch(process.env.REACT_APP_STUDENTNUM_API, {
      method: "GET",
      "Content-Type": "application/json",
    });

    getAPi = await getAPi.json();
    setNumberStudents(getAPi[0].student_no);
  };

  // FUNCTION OF FETCHING THE NUMBER OF TEACHERS
  const getTeacherStrength = async () => {
    let getAPi = await fetch(process.env.REACT_APP_TEACHERNUM_API, {
      method: "GET",
      "Content-Type": "application/json",
    });

    getAPi = await getAPi.json();
    setNumberTeachers(getAPi[0].teacher_no);
  };

  // FUNCTION OF FETCHING THE NUMBER OF WORKERS
  const getWorkerStrength = async () => {
    let getAPi = await fetch(process.env.REACT_APP_WORKERNUM_API, {
      method: "GET",
      "Content-Type": "application/json",
    });

    getAPi = await getAPi.json();
    setNumberWorkers(getAPi[0].worker_no);
  };

  // code for using the useeffect
  useEffect(() => {
    getStudentStrength();
    getTeacherStrength();
    getWorkerStrength();
  }, []);
  // CODE FOR FETCHING THE PI OF STUDNET DATA

  // Data For Fee Of Students
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark2", // "light1", "dark1", "dark2"
    title: {
      text: "Student Fee Record",
    },
    data: [
      {
        type: "pie",
        indexLabel: "{label}: {y}%",
        startAngle: -90,
        dataPoints: [
          { y: 40, label: "Paid" },
          { y: 30, label: "Not Paid" },
          { y: 30, label: "Partial" },
        ],
      },
    ],
  };

  // Data For Monthly Expenses
  const salaryData = {
    animationEnabled: true,
    theme: "dark2",
    exportEnabled: true,
    title: {
      text: "Academic Monthly Expenses",
    },
    axisX: {
      valueFormatString: "MMM",
    },
    axisY: {
      prefix: "₹",
    },
    data: [
      {
        yValueFormatString: "₹#,###",
        xValueFormatString: "MMMM",
        type: "spline",
        dataPoints: [
          { x: new Date(2017, 0), y: 25060 },
          { x: new Date(2017, 1), y: 27980 },
          { x: new Date(2017, 2), y: 42800 },
          { x: new Date(2017, 3), y: 32400 },
          { x: new Date(2017, 4), y: 35260 },
          { x: new Date(2017, 5), y: 33900 },
          { x: new Date(2017, 6), y: 40000 },
          { x: new Date(2017, 7), y: 52500 },
          { x: new Date(2017, 8), y: 32300 },
          { x: new Date(2017, 9), y: 42000 },
          { x: new Date(2017, 10), y: 37160 },
          { x: new Date(2017, 11), y: 38400 },
        ],
      },
    ],
  };

  return (
    <>
      <div>
        <div className="p-3 d-flex justify-content-around mt-3">
          <div className="px-3 pt-2 pb-3 border shadow-sm w-25 mainThreeDiv">
            <div className="text-center pb-1">
              <h4>Total Students</h4>
            </div>
            <hr />
            <div className="">
              <h5 className="text-center text-danger">{numberStudent}</h5>
            </div>
          </div>
          <div className="px-3 pt-2 pb-3 border shadow-sm w-25 mainThreeDiv">
            <div className="text-center pb-1">
              <h4>Total Teachers</h4>
            </div>
            <hr />
            <div className="">
              <h5 className="text-center text-danger">{numberTeachers}</h5>
            </div>
          </div>
          <div className="px-3 pt-2 pb-3 border shadow-sm w-25 mainThreeDiv">
            <div className="text-center pb-1">
              <h4>Total Workers</h4>
            </div>
            <hr />
            <div className="">
              <h5 className="text-center text-danger">{numberWorkers}</h5>
            </div>
          </div>
        </div>
      </div>
      {/* code for chart showing */}
      <div className="container mt-3">
        <div className="row">
          <div className="col-6">
            <div className="studentDataCol">
              <CanvasJSChart options={options} />
            </div>
          </div>

          <div className="col-6">
            <div className="studentDataCol">
              <CanvasJSChart options={salaryData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
