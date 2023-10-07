import React, { useState } from 'react'
import './css/Setting.css'
export default function Setting() {
const [passStatus, setPassStatus] = useState("password")
// FUNCTION FOR TOOGLING THE PASSWORD
  const tooglePassword=()=>{
    if(passStatus==="password"){
      setPassStatus("text")
    }
    else{
      setPassStatus("password")
    }
  }
  return (
    <>
      <h1 className='text-light text-center mt-3'>Change Password</h1>
      <div className="container">
        <div className="row">
          <div className="col-4 offset-4 mainContainerColOfPasswordChange">
            <form>
              <label htmlFor="currentPassword" className='text-danger'>Current Password</label>
              <input type={passStatus} name="currentPassword" id="currentPassword" placeholder='Enter Current Password' required/>

              <label htmlFor="currentPassword" className='text-danger'>New Password</label>
              <input type={passStatus} name="currentPassword" id="newPassword" placeholder='Enter New Password' required/>

              <label htmlFor="currentPassword" className='text-danger'>Confirm Password</label>
              <input type={passStatus} name="currentPassword" id="confirmPassword" placeholder='Enter Confirm Password' required/>

              <input type="checkbox" name="togglePassword" id="togglePasswordSetting" onClick={()=>{tooglePassword()}}/>
              <label htmlFor="tooglePasswor">{passStatus==="password"?"Show":"Hide"} Password</label>
              <hr />
              <button type="submit" className='btn btn-success'>Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
