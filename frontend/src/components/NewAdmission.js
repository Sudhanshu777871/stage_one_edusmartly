import React, { useState } from 'react'
import './css/Newadmission.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function NewAdmission() {
  const schoolName = localStorage.getItem("academic")
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
  const [myclass, setMyClass] = useState("")
  const [parent, setParent] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [dob, setDob] = useState("")


  const setAdmissionForm = async (event) => {
    event.preventDefault()
    let studentId = schoolName.slice(1, 4) + fName.slice(0, 3)
    let getAPI = await fetch(process.env.REACT_APP_NEWADMISSION_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fName: fName, lName: lastName, myClass: myclass, ParentName: parent, Address: address, PhoneNo: phone, Email: email, DOB: dob, Student_ID: studentId })
    })
    // checking the config
    if (getAPI) {
      getAPI = await getAPI.json()
      if (getAPI.affectedRows) {
        setFName("")
        setLastName("")
        setParent("")
        setAddress("")
        setPhone("")
        setEmail("")
        setDob("")
        notify("Addmission Done Successfully")
      } else {
        notify("Addmission Failed")
      }
    }

  }

  return (
    <>
      <h1 className='text-ligt text-center mt-4'>New Admission - <span className='text-warning'>{schoolName}</span></h1>
      <div className="container mt-3">
        <form onSubmit={setAdmissionForm}>
          <div className="row ">
            <div className="col-12">
              <h5 className='mt-3 secodnHeadStyle'>Enter Student Details Here</h5>
              <hr className='hrStyle' />
            </div>

            <div className="col-6 mt-2">
              <label htmlFor="fName">First Name</label>
              <input type="text" className="inputBoxStyle" name="fName" id="fName" placeholder='First Name' required onChange={(e) => { setFName(e.target.value) }} autoComplete='off' value={fName} />
            </div>

            <div className="col-6 mt-2">
              <label htmlFor="lName">Last Name</label>
              <input type="text" className="inputBoxStyle" name="lName" id="lName" placeholder='Last Name' required onChange={(e) => { setLastName(e.target.value) }} autoComplete='off' value={lastName} />
            </div>

            <div className="col-6 mt-2">
              <label htmlFor="class">Choose Class</label>
              <select name="class" id="class" required onChange={(e) => { setMyClass(e.target.value) }}>
                <option value="Select Class" disabled>Select Class</option>

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

            <div className="col-6 mt-2">
              <label htmlFor="email">Email</label>
              <input type="email" className="inputBoxStyle" name="email" id="email" placeholder='Enter Email' required onChange={(e) => { setEmail(e.target.value) }} autoComplete='off' value={email} />
            </div>

            <div className="col-6 mt-2">
              <label htmlFor="dob">DOB</label>
              <input type="date" className="inputBoxStyle" name="dob" id="dob" required onChange={(e) => { setDob(e.target.value) }} autoComplete='off' value={dob} />
            </div>


            {/* code for admission button */}
            <button type="submit" className='btn btn-success mx-3 mt-3'>New Admission <i className="fa-solid fa-paper-plane" style={{ color: "#fafcff" }}> </i></button>

          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}
