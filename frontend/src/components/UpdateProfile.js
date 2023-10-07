import React, { useState, useEffect } from 'react'
import './css/Newadmission.css'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateProfile() {
  const schoolName = localStorage.getItem("academic")
// accessing the usenavigate
const navigate = useNavigate()
  // code for notify
  const notify = (msg) =>
    toast.info(msg, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });


  // code for usestatae
  const [fName, setFName] = useState("")
  const [lastName, setLastName] = useState("")
  const [parent, setParent] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")


  const setAdmissionForm = async (event) => {
    event.preventDefault()
    let student_Id = localStorage.getItem('stundent_Id')
    let getAPI = await fetch(process.env.REACT_APP_UPDATE_PROFILE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: student_Id,fName: fName, lName: lastName, ParentName: parent, Address: address, PhoneNo: phone, Email: email})
    })
    // checking the config
    if (getAPI) {
      getAPI = await getAPI.json()
      if (getAPI.affectedRows) {

        notify("Profile Is Updated Successfully")
      } else {
        notify("Updation Failed")
      }
    }

  }

  // FUNCTION FOR PRE FILL INPUT
  const preFilled = async () => {
    let student_Id = localStorage.getItem('stundent_Id')
    let getApi = await fetch(process.env.REACT_APP_STUDENT_PROFILE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_Id })
    })

    if (getApi) {
      getApi = await getApi.json();
      setFName(getApi[0].First_Name)
      setLastName(getApi[0].Last_Name)
      setParent(getApi[0].Parent_Name)
      setAddress(getApi[0].Address)
      setPhone(getApi[0].Phone_No)
      setEmail(getApi[0].Email)
    }
  }
  // CODE FOR USEEFFECT
  useEffect(() => {
    if(localStorage.getItem("stundent_Id")){
      preFilled()
    }
    else{
      navigate('/')
    }
  }, [navigate])
  return (
    <>
      <h1 className='text-ligt text-center mt-4'>Update Profile - <span className='text-warning'>{schoolName}</span></h1>
      <div className="container mt-3">
        <form onSubmit={setAdmissionForm}>
          <div className="row ">
            <div className="col-12">
              <h5 className='mt-3 secodnHeadStyle'>Update Student Details Here</h5>
              <hr className='hrStyle' />
            </div>

            <div className="col-6 mt-2">
              <label htmlFor="fName">First Name</label>
              <input type="text" className="inputBoxStyle" name="fName" id="fName" placeholder='First Name' value={fName} required onChange={(e) => { setFName(e.target.value) }} autoComplete='off' />
            </div>

            <div className="col-6 mt-2">
              <label htmlFor="lName">Last Name</label>
              <input type="text" className="inputBoxStyle" name="lName" id="lName" placeholder='Last Name' required onChange={(e) => { setLastName(e.target.value) }} value={lastName} autoComplete='off' />
            </div>

            <div className="col-6 mt-2">
            <label htmlFor="email">Email</label>
              <input type="email" className="inputBoxStyle" name="email" id="email" placeholder='Enter Email' required onChange={(e) => { setEmail(e.target.value) }} autoComplete='off' value={email} />
            </div>

            <div className="col-6 mt-2">
              <label htmlFor="pName">Parent Name</label>
              <input type="text" className="inputBoxStyle" name="pName" id="pName" placeholder='Parent Name' required onChange={(e) => { setParent(e.target.value) }} autoComplete='off' value={parent} />
            </div>

            <div className="col-6 mt-2">
              <label htmlFor="address">Address</label>
              <input type="text" className="inputBoxStyle" name="address" id="address" placeholder='Enter Address' required onChange={(e) => { setAddress(e.target.value) }} autoComplete='off' value={address} />
            </div>

            <div className="col-6 mt-2">
              <label htmlFor="phone">Phone No</label>
              <input type="text" pattern="[7-9]{1}[0-9]{9}"
                title="Phone number starts with 7-9 and remaing 9 digit with 0-9 and must be 10 digit" className="inputBoxStyle" name="phone" id="phone" placeholder='Enter Phone No' required onChange={(e) => { setPhone(e.target.value) }} autoComplete='off' value={phone} />
            </div>


            {/* code for admission button */}
            <button type="submit" className='btn btn-success mx-3 mt-3'>Update Profile <i className="fa-solid fa-paper-plane" style={{ color: "#fafcff" }}> </i></button>

          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}
