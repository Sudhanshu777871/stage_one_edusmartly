import React, { useState } from "react";
import "./css/Managestudent.css";
import loader from './img/loader.gif'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ManageStudents() {
  const [data, setData] = useState([])
  const [studentData, setStudentData] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [loaderStatus, setLoaderStatus] = useState(false)
  const [message, setMessage] = useState('')
  const [studentDataProfile, setStudentDataProfile] = useState([])
  const [profileStatus, setProfileStatus] = useState(false)
  const [feesStatus, setFeesStatus] = useState(0)
  const [feesStatusToogle, setfeesStatusToogle] = useState(false)
  const [months] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])

  const navigate = useNavigate();

  // code for notify
  // ERROR
  const erroMsg = (msg) =>
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
  // SUCCESS
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



  // making function for seraching the data
  const searchData = async () => {
    setLoaderStatus(true)
    let getApi = await fetch(process.env.REACT_APP_SEARCH_STUDENT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentData, studentClass })
    })
    // checking the api response
    if (getApi) {
      getApi = await getApi.json()
      // storing the value in setData usestate variable
      setData(getApi)
      setLoaderStatus(false)
      setMessage("No Data Found...")
    }

  }

  // FUNCTION FOR STUDNET PROFILE (API)
  const studentProfile = async (id) => {
    let getApi = await fetch(process.env.REACT_APP_STUDENT_PROFILE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_Id: id })
    })
    // checking the api
    if (getApi) {
      getApi = await getApi.json();
      setStudentDataProfile(getApi)
      setProfileStatus(true)
    }
  }

  // FUNCTION FOR MAKING THE API OF UPDATE PROFILE
  const updateProfile = async (id) => {
    localStorage.setItem("stundent_Id", id)
    navigate('/update_profile')
  }

  // FUNCTION FOR SHOWING THE FEES STURUCTURE
  const showFees = async (id) => {
    let getApi = await fetch(process.env.REACT_APP_SHOW_FEE_STATUS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentfee_Id: id })
    })

    // chekcking the API
    if (getApi) {
      getApi = await getApi.json()
      setFeesStatus(getApi[0].Fees)
      setfeesStatusToogle(true)
    }
  }

  // FUNCTION FOR DELETING THE STUDNENT
  const deleteStudent = async (id, studentName) => {

    let confirmationPrompt = prompt(`Type Student Name For Deletion "${studentName}"`)
    if (confirmationPrompt === studentName) {
      let getAPI = await fetch(process.env.REACT_APP_STUDENT_DELETE, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Student_Id: id })
      })

      /// chekcing the api
      if (getAPI) {
        getAPI = await getAPI.json()
        if (getAPI.affectedRows) {
          successMsg("Student Deleted SuccessFully...")
        }
        else {
          erroMsg("Student Not Deleted, Try Again...")
        }
      }
    }

    else {
      erroMsg("Typed Name Not Matched, Try Again...")
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
              placeholder="Search Student By Name / Id ..." autoComplete="off" onChange={(e) => { setStudentData(e.target.value) }}
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
              className="btn btn-success addStudentBtn"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={() => { searchData() }}>
              Search{" "}
              <i className="fa-solid fa-search" style={{ color: "#f7f7f7", marginLeft: "10px" }}></i>
            </button>
          </div>
        </div>
      </div>

      {/* code for showing all the data of students */}
      {
        data.length <= 0 ? <h5 className="text-danger mt-4 noDataFoundStyleMsg">{message}</h5> :

          <div className="container-fluid mt-5 dataShownContainer">
            <div className="row">
              <div className="col-12 table-responsive">
                <table className="table table-hover table-dark">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Student Id</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Parent Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Phone No</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((items, index) => {
                      return (
                        <tr key={index}>
                          <td>{items.Student_Id}</td>
                          <td>{items.First_Name}</td>
                          <td>{items.Parent_Name}</td>
                          <td>{items.Address}</td>
                          <td>{items.Phone_No}</td>
                          <td>
                            <i className="fa-solid fa-eye  hoverStyle mx-2" style={{ color: "rgb(4, 90, 90)" }} title="Profile" data-toggle="modal" data-target="#profile" onClick={() => { studentProfile(items.Student_Id) }}></i>

                            <i className="fa-solid fa-newspaper hoverStyle  mx-2" style={{ color: "rgb(65, 62, 62)" }} title="Fee Record" data-toggle="modal" data-target="#fee" onClick={() => { showFees(items.Student_Id) }}></i>

                            <i className="fa-solid fa-chart-simple mx-2 hoverStyle" style={{ color: "#046214" }} title="Progress"></i>
                            <i className="fa-solid fa-pen-to-square hoverStyle mx-2" style={{ color: "#f05b05" }} title="Edit" onClick={() => { updateProfile(items.Student_Id) }}></i>

                            <i className="fa-solid fa-trash hoverStyle" style={{ color: "#f2020e" }} title="Delete" onClick={() => { deleteStudent(items.Student_Id, items.First_Name) }}></i>

                          </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      }
      {loaderStatus && <img src={loader} width="80" height="80" alt="loader" style={{ marginLeft: '50%' }} />}
      {/* code for profile modal */}
      {profileStatus &&
        <div className="modal fade" id="profile" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title text-danger" id="exampleModalLabel">{studentDataProfile[0].First_Name} - Profile</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {
                  studentDataProfile.map((item, index) => {
                    return (
                      <div key={index} className="text-dark">

                        <strong><span className="text-primary"> Student-Id</span> : {item.Student_Id}</strong>
                        <hr className="hrStyleProfileModal" />
                        <strong><span className="text-primary">First Name</span>  : {item.First_Name}</strong>
                        <hr className="hrStyleProfileModal" />
                        <strong> <span className="text-primary">Last Name</span> : {item.Last_Name}</strong>
                        <hr className="hrStyleProfileModal" />
                        <strong><span className="text-primary">Class</span>  : {item.Class}</strong>
                        <hr className="hrStyleProfileModal" />
                        <strong><span className="text-primary">Parent Name</span>  : {item.Parent_Name}</strong>
                        <hr className="hrStyleProfileModal" />
                        <strong> <span className="text-primary">Address</span> : {item.Address}</strong>
                        <hr className="hrStyleProfileModal" />
                        <strong><span className="text-primary">Phone No</span>  : {item.Phone_No}</strong>
                        <hr className="hrStyleProfileModal" />
                        <strong><span className="text-primary">Email</span>  : {item.Email}</strong>
                        <hr className="hrStyleProfileModal" />
                        <strong><span className="text-primary">DOB</span> : {item.DOB}</strong>
                        <hr className="hrStyleProfileModal" />
                        <strong><span className="text-primary">Admission Date</span>  : {item.Date}</strong>
                      </div>
                    )
                  })
                }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      }


      {/* CODE FOR FEES */}
      {feesStatusToogle &&
        <div className="modal fade" id="fee" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title text-danger" id="exampleModalLabel"><strong>Sudhanshu Kumar - Fees</strong> </h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body text-dark">
                <div className="mx-4">
                  <div className="container">
                    <div className="row">
                      {
                        months.map((items, index) => {
                          if (index + 1 <= feesStatus) {
                            return (
                              <div className="col-2 my-3" key={index}>
                                <span className="mothlyFeeStyle" style={{ backgroundColor: "green", color: "white" }}>{items}</span>
                              </div>
                            )
                          } else {
                            return (
                              <div className="col-2 my-3" key={index}>
                                <span className="mothlyFeeStyle">{items}</span>
                              </div>
                            )
                          }

                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      }
      <ToastContainer />
    </>
  );
}
