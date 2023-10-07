import React, { useState, useEffect } from 'react'
import './css/Newadmission.css'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function UpdateFaculty() {
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
    const [fNaam, setfNaam] = useState("")
    const [sNaam, setSNaam] = useState("")
    const [education, setEducation] = useState("")
    const [addhar, setAddhar] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [salary, setSalary] = useState("")


    const setAdmissionForm = async (event) => {
        event.preventDefault()
        let teacherId = localStorage.getItem("Teacher_Id")
        let getAPI = await fetch("http://localhost:5600/faculty_profile_update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ teacherId, fNaam, sNaam, education, addhar, address, phone, email, salary })
        })
        // checking the config
        if (getAPI) {
            getAPI = await getAPI.json()
            if (getAPI.affectedRows) {
                setfNaam("")
                setSNaam("")
                setEducation("")
                setAddhar("")
                setAddress("")
                setPhone("")
                setEmail("")
                setSalary("")
                notify("Faculty Profile Updated Successfully...")
            } else {
                notify("Faculty Profile Not Updated, Try Again...")
            }
        }

    }


    // FUNCTION FOR PRE FILL INPUT
    const preFilled = async () => {
        let Teacher_Id = localStorage.getItem('Teacher_Id')
        let getApi = await fetch(process.env.REACT_APP_FACULTY_PREFILL_PROFILE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Teacher_Id })
        })

        if (getApi) {
            getApi = await getApi.json();
            setfNaam(getApi[0].First_Name)
            setSNaam(getApi[0].Second_Name)
            setEducation(getApi[0].Qualification)
            setAddhar(getApi[0].Addhar)
            setAddress(getApi[0].Address)
            setPhone(getApi[0].Phone)
            setEmail(getApi[0].Email)
            setSalary(getApi[0].Salary)
        }
    }
    // CODE FOR USEEFFECT
    useEffect(() => {
        if (localStorage.getItem("Teacher_Id")) {
            preFilled()
        }
        else {
            navigate('/')
        }
    }, [navigate])



    return (
        <>
            <h1 className='text-ligt text-center mt-4'>Update Profile Faculty - <span className='text-warning'>{schoolName}</span></h1>
            <div className="container mt-3">
                <form onSubmit={setAdmissionForm}>
                    <div className="row ">
                        <div className="col-12">
                            <h5 className='mt-3 secodnHeadStyle'>Enter Faculty Details Here</h5>
                            <hr className='hrStyle' />
                        </div>

                        <div className="col-6 mt-2">
                            <label htmlFor="fName">First Name</label>
                            <input type="text" className="inputBoxStyle" name="name" id="name" placeholder='First Name' required onChange={(e) => { setfNaam(e.target.value) }} autoComplete='off' value={fNaam} />
                        </div>

                        <div className="col-6 mt-2">
                            <label htmlFor="fName">Second Name</label>
                            <input type="text" className="inputBoxStyle" name="name" id="name" placeholder='Second Name' required onChange={(e) => { setSNaam(e.target.value) }} autoComplete='off' value={sNaam} />
                        </div>

                        <div className="col-6 mt-2">
                            <label htmlFor="lName">Qualification</label>
                            <input type="text" className="inputBoxStyle" name="edcation" id="education" placeholder='Qualification' required onChange={(e) => { setEducation(e.target.value) }} autoComplete='off' value={education} />
                        </div>

                        <div className="col-6 mt-2">
                            <label htmlFor="pName">Addhar</label>
                            <input type="text" className="inputBoxStyle" name="addhar" id="addhar" placeholder='Addhar No' required onChange={(e) => { setAddhar(e.target.value) }} autoComplete='off' value={addhar} />
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
                            <label htmlFor="email">Salary</label>
                            <input type="number" className="inputBoxStyle" name="salary" id="salary" placeholder='Enter Salary' required onChange={(e) => { setSalary(e.target.value) }} autoComplete='off' value={salary} />
                        </div>



                        {/* code for admission button */}
                        <button type="submit" className='btn btn-success mx-3 mt-3'>New Faculty <i className="fa-solid fa-paper-plane" style={{ color: "#fafcff" }}> </i></button>

                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
