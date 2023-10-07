import React, { useEffect, useState } from 'react'
import './css/FacultyRecord.css'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
export default function FacultyRecord() {
  // code for accessing the school name from localstorage
  const schoolName = localStorage.getItem("academic")
  const [result, setResult] = useState([])

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

  // function for showing all the data of faculty
  const facultyShow = async () => {
    let getAPI = await fetch(process.env.REACT_APP_FACULTY_FETCH_DATA, {
      method: "GET",
      headers: { "Content-Type": "applicatio/json" }
    })
    // code for api result
    if (getAPI) {
      getAPI = await getAPI.json()
      setResult(getAPI)
    }
  }

  // FUNCTION FOR DELETING THE STUDNENT
  const deleteFaculty = async (id, teacherName) => {

    let confirmationPrompt = prompt(`Type Student Name For Deletion "${teacherName}"`)
    if (confirmationPrompt === teacherName) {
      let getAPI = await fetch("http://localhost:5600/delete_faculty", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Teacher_Id: id })
      })

      /// chekcing the api
      if (getAPI) {
        getAPI = await getAPI.json()
        if(getAPI.affectedRows){
          successMsg("Faculty Deleted SuccessFully...")
        }
        else{
          erroMsg("Faculty Not Deleted, Try Again...") 
        }
      }
    }

    else {
      erroMsg("Typed Name Not Matched, Try Again...")
    }

  }

  // code for making function for updating the profile of faculty
const updateFacultyProfile=(id)=>{
localStorage.setItem("Teacher_Id",id)
navigate('/update_faculty')
}
  useEffect(() => {
    facultyShow()
  }, [])
  return (
    <>
      <h1 className='text-light text-center mt-3'>Faculty Records - <span className='text-warning'>{schoolName}</span> </h1>
      {/* CODE FOR SHOWING THE DATA OF THE FACULTY */}
      <div className="container-fluid myMainContainer mt-5">
        <div className="row">
          <div className="col-12">


            <table className="table table-bordered">
              <thead className="thead-dark">

                <tr>
                  <th scope="col">Teacher ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Second Name</th>
                  <th scope="col">Qualification</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Addhar</th>
                  <th scope="col">Salary</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item, index) => {

                  return (
                    <tr className="text-light" key={index} >

                      <td>{item.Teacher_Id}</td>
                      <td>{item.First_Name}</td>
                      <td>{item.Second_Name}</td>
                      <td>{item.Qualification}</td>
                      <td>{item.Phone}</td>
                      <td>{item.Email}</td>
                      <td>{item.Address}</td>
                      <td>{item.Addhar}</td>
                      <td>&#8377; {item.Salary}</td>
                      <td>
                        <i className="fa-solid fa-pen-to-square hoverStyle text-info mx-1" title="Edit" onClick={()=>{updateFacultyProfile(item.Teacher_Id)}}></i>
                        <i className="fa-solid fa-trash hoverStyle text-danger mx-1" title="Delete" onClick={() => { deleteFaculty(item.Teacher_Id, item.First_Name) }}></i>
                      </td>

                    </tr>
                  )
                })}
              </tbody>
            </table>


          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
