import React, { useState } from 'react'
import './css/Managefess.css'
import './css/Managestudent.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ManageFees() {

  // code for using the usestate
  const [inputData, setInputData] = useState('')
  const [studentClass, setStudentClass] = useState('')
  const [result, setResult] = useState([]) // usestate for storing the value of student data in array (not checkbox data for fees)
  const [resultShow, setResultShow] = useState(false) // using usestate for toogle the student data (not checkbox comp)
  const [fessStatus, setFeesStatus] = useState(0)
  const [months] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])
  const [feeResultShow, setFeesResultShow] = useState(false)
  const [feesMaxNum] = useState([])
  // code for notify
  const errorMsg = (msg) =>
    toast.error(msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const successMsg = (msg) =>
    toast.success(msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  // FUNCTION FOR SEARCHING THE STUDNET DATA
  const searchStudent = async () => {
    if (inputData === "") {
      errorMsg("Please Enter The Student Name / ID")
    }
    else {

      let getAPI = await fetch(process.env.REACT_APP_SEARCH_STUDENT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentData: inputData, studentClass: studentClass })
      })
      // checking the api result
      if (getAPI) {
        getAPI = await getAPI.json()

        // setting the api result to result state
        setResult(getAPI)
        setResultShow(true)
      }
    }
  }

  // CODE FOR MAKING THE FUNCTION OF ACCESSING THE DATA OF STUDNET FEES
  const ManageFeesFun = async (id) => {
    let getAPI = await fetch(process.env.REACT_APP_SHOW_FEE_STATUS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentfee_Id: id })
    })
    // code for result of api
    if (getAPI) {

      getAPI = await getAPI.json()
      // storing the fees status to setfeestatus
      setFeesStatus(getAPI[0].Fees)
      // change state for showing the fees result

      setFeesResultShow(true)
    }
  }

  // CODE FOR SETTING THE FEES STATUS FUNCTION
  const funMaxMonVal = (feesMonth) => {
    feesMaxNum.push(feesMonth)
    console.log(feesMaxNum)
  }

  // CODE FOR MAKING THE FUNCTION TO UPDATE 

  const updateFees = async () => {
    const studentIdSave = localStorage.getItem("studentIdFees")
    const maxNum = Math.max(...feesMaxNum)
    // api code

    let getAPI = await fetch("http://localhost:5600/updates_fees", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feesStatus: maxNum, studentId: studentIdSave })

    })
    // getting the result og the api
    if (getAPI) {
      getAPI = await getAPI.json()
      if (getAPI.affectedRows) {
        successMsg("Fees Updated SuccessFully...")
      }
      else {
        errorMsg("Fees Not Updated, Please Try Again...")
      }
    }

  }
  return (
    <>

      <div className="container mt-3">
        <div className="row">
          <div className="col-8">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Enter Studen Name / Id ..." autoComplete="off" onChange={(e) => { setInputData(e.target.value); setResultShow(false); setFeesResultShow(false) }} value={inputData}
            />
          </div>
          <div className="col-2">
            <select name="filter" id="filter" onChange={(e) => { setStudentClass(e.target.value) }}>
              <option value="">All</option>
              <option value="1">Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
              <option value="5">Class 5</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>

          <div className="col-2">
            <button
              type="button"
              className="btn btn-info addStudentBtn" onClick={() => { searchStudent() }}>
              Search{" "}
              <i className="fa-solid fa-search" style={{ color: "#f7f7f7", marginLeft: "10px" }}></i>
            </button>
          </div>

          {/* CODE FOR SHOWING THE RESULT HERE */}

          {
            resultShow && <div className="col-12 mt-3">

              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Student-ID</th>
                    <th scope="col">Class</th>
                    <th scope="col">Phone</th>

                    <th scope="col">Parent Name</th>
                    {/* <th scope="col">Fee Status</th> */}
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "white" }}>

                  {
                    result.map((items, index) => {
                      localStorage.setItem("studentIdFees", items.Student_Id) 
                    
                      return (
                        <tr key={index}>
                          

                          <td>{items.Student_Id}</td>
                          <td>{items.Class}</td>
                          <td>{items.Phone_No}</td>
                          <td>{items.Parent_Name}</td>
                          <td><button className='btn btn-warning' onClick={() => { ManageFeesFun(items.Student_Id) }}>Manange Fees</button></td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </table>
            </div>
          }
        </div>
      </div>

      {/* CODE FOR UPDATION OF THE FEES DATA */}
      {feeResultShow &&

        <div className="container bg-light px-3 py-3 mt-5">
        
          <div className="row">
            <div className="col-12" style={{ display: 'flex' }}>
              {months.map((result, index) => {

                if (index + 1 <= fessStatus) {
                  return (
                    <div key={index}>
                      <input type="checkbox" className='mx-3' name="fees" value="1" disabled checked />
                      <label htmlFor="fees" className='text-success feeSubmitted'> {result} </label>
                    </div>
                  )
                }
                else {
                  return (
                    <div key={index}>
                      <input type="checkbox" className='mx-3' name="fees" value={index + 1} onClick={() => { funMaxMonVal(index + 1) }} />
                      <label htmlFor="fees" className='text-danger feeSubmitted'> {result} </label>
                    </div>
                  )
                }
              })}

              <hr />
              <button className='btn btn-success mx-4' onClick={()=>{updateFees()}}>Update Fees</button>
            </div>
          </div>
        </div>
      }
      <ToastContainer />
    </>
  )
}
