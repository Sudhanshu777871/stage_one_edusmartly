import React, { useState } from 'react'
import './css/Newadmission.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AddSchedule() {
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
    const [teacherId, setTeacherId] = useState("")
    const [teacherName, setTeacherName] = useState("")
    const [subjectName, setSubjectName] = useState("")
    const [myclass, setMyClass] = useState("")



    const setAdmissionForm = async (event) => {
        event.preventDefault()
        let getAPI = await fetch(process.env.REACT_APP_ADD_SCHEDULE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ teacherId, teacherName, subjectName, myclass })
        })
        // checking the config
        if (getAPI) {
            getAPI = await getAPI.json()
            if (getAPI.affectedRows) {
                setTeacherId("")
                setTeacherName("")
                setSubjectName("")
                notify("Schedule Added Successfully...")
            } else {
                notify("Schedule Failed, Try Again...")
            }
        }

    }

    return (
        <>
            <h1 className='text-ligt text-center mt-4'>Class Schedule - <span className='text-warning'>{schoolName}</span></h1>
            <div className="container mt-3">
                <form onSubmit={setAdmissionForm}>
                    <div className="row ">
                        <div className="col-12">
                            <h5 className='mt-3 secodnHeadStyle'>Enter Schedule Details Here</h5>
                            <hr className='hrStyle' />
                        </div>

                        <div className="col-6 mt-2">
                            <label htmlFor="fName">Teacher - ID</label>
                            <input type="text" className="inputBoxStyle" name="teacherId" id="teacherId" placeholder='Teacher-ID' required onChange={(e) => { setTeacherId(e.target.value) }} autoComplete='off' value={teacherId} />
                        </div>

                        <div className="col-6 mt-2">
                            <label htmlFor="lName">Teacher Name</label>
                            <input type="text" className="inputBoxStyle" name="tacherName" id="tacherName" placeholder='Teacher Name' required onChange={(e) => { setTeacherName(e.target.value) }} autoComplete='off' value={teacherName} />
                        </div>

                        <div className="col-6 mt-2">
                            <label htmlFor="pName">Subject Name</label>
                            <input type="text" className="inputBoxStyle" name="subjectName" id="subjectName" placeholder='Subject Name' required onChange={(e) => { setSubjectName(e.target.value) }} autoComplete='off' value={subjectName} />
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


                        {/* code for admission button */}
                        <button type="submit" className='btn btn-success mx-3 mt-3'>Add Schedule <i className="fa-solid fa-paper-plane" style={{ color: "#fafcff" }}> </i></button>

                    </div>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
