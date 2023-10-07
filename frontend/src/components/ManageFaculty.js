import React, { useEffect, useState } from 'react'
import './css/ManageFaculty.css'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ManageFaculty() {
  // code for accessing the school name from localstorage
  const schoolName = localStorage.getItem("academic")

  const navigate = useNavigate();

  // code for useestate
  const [result, setResult] = useState([])
  const [displayResult, setDisplayResult] = useState(false);
  // usestate for stoting the data
  const [searchInputData, setSearchInputData] = useState('')
  const [searchOptionClass, setSearchOptionClass] = useState('')

  // code for making the function for fetching all details about class schedule
  const classSchedule = async () => {
    let getAPI = await fetch(process.env.REACT_APP_ALL_SCHEDULE, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    // chekcing the response
    if (getAPI) {
      getAPI = await getAPI.json()
      setResult(getAPI)
      setDisplayResult(true)
    }
  }

  // code for notify (SUCCESS)
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
// SUCCESS
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



  // CODE FOR SEARCHING THE DATA
  const searchData = async () => {
    if (searchInputData !== "") {
      let getAPI = await fetch("http://localhost:5600/search_schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchData: searchInputData, searchClass: searchOptionClass })
      })

      // code for updating the result 
      if (getAPI) {
        getAPI = await getAPI.json()
        setResult(getAPI)
      }
    }
    else {
      errorMsg("Search Field Must Not Be Empty...")
    }


  }

  // FUNCTION FOR DELETING THE SCHEDULE
  const deleteSchedule = async (id) => {
    const confirming = window.confirm("Are You Sure To Delete Bill ?");
    if (confirming) {
      let getApi = await fetch("http://localhost:5600/delete_schedule", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (getApi) {
        getApi = await getApi.json();
        if (getApi.affectedRows) {
          classSchedule()
          successMsg("Schedule Deleted Successfully");
        } else {
          errorMsg("Schedule Not Deleted Successfully");
        }
      }
    } else {
      return false;
    }

  };

  // code for useeffect
  useEffect(() => {
    classSchedule()
  }, [])
  return (
    <>
      <h2 className='text-light text-center mt-2'>Manage Faculty - <span className='text-warning'>{schoolName}</span> </h2>

      {/* CODE FOR SHOWING ALL THE DETAILS ABOUT CLASS SCHEDULE */}
      {displayResult &&
        <div className="container myMainContainer">
          <div className="row mt-5">
            <div className="col-12">
              <table className="table table-bordered">
                <thead className="thead-dark">

                  <tr>
                    <th scope="col">Teacher-ID</th>
                    <th scope="col">Teacher Name</th>
                    <th scope="col">Class</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {result.map((item, index) => {

                    return (
                      <tr className="text-light" key={index} >
                        <td>{item.Teacher_Id}</td>
                        <td>{item.Teacher_Name}</td>
                        <td>{item.Class}</td>
                        <td>{item.Subject}</td>
                        <td className='d-flex justify-content-center'>
                          <i className="fa-solid fa-trash text-danger hoverStyle" title="Delete" onClick={() => { deleteSchedule(item.Serial_Number) }}></i>
                        </td>
                      </tr>
                    )


                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }

      {/* CODE FOR OPTION BELOW DISPLAY DATA */}


      <div className="container allOptionsStyle">
        <div className="row">
          <div className="col-4 offset-2">
            <input type="search" placeholder='Search Through Teacher Name/ID' value={searchInputData} onChange={(e) => { setSearchInputData(e.target.value) }} />
          </div>

          <div className="col-2" style={{ display: 'flex' }}>
            <select name="class" id="class" onChange={(e) => { setSearchOptionClass(e.target.value) }}>
              <option value="1" >Class 1</option>
              <option value="2">Class 2</option>
              <option value="3">Class 3</option>
              <option value="4">Class 4</option>
              <option value="5">Class 5</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10" selected>Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
            <button className='btn btn-info mx-1' onClick={() => { searchData() }}><i className="fa-solid fa-magnifying-glass" style={{ color: "#fafafa" }}></i></button>
          </div>

          <div className="col-2">
            <button className='btn btn-success btnStyle' onClick={() => { navigate('/add_class_schedule') }}>Add Class Schedule</button>
          </div>

          <div className="col-2">
            <button className='btn btn-danger btnStyle' onClick={() => { navigate('/new_faculty') }}>Add New Faculty</button>
          </div>

        </div>

      </div>
      <ToastContainer />
    </>
  )
}
