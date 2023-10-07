import React, { useEffect, useState } from "react";
import logo from "./img/logo.png";
import "./css/Login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  // state for academic id and password
  const [academicId, setAcademicId] = useState("");
  const [password, setacademicPass] = useState("");

  const navigate = useNavigate();

  // code for notify
  const notify = (msg) =>
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

  // function for handel login form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    let login = await fetch(process.env.REACT_APP_LOGIN_CREDENTIALS_API, {
      method: "POST",
      body: JSON.stringify({ Academic_Id: academicId, Password: password }),
      headers: { "Content-Type": "application/json" },
    });

    if (login) {
      login = await login.json();

      if (login.length !== 0) {
        localStorage.setItem("academic", JSON.stringify(login[0].Name));
        navigate("/");
      } else {
        notify("Invalid Credentials");
      }
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("academic");
    if (auth) {
      navigate("/");
    }
  });

  return (
    <>
      <div className="wrapper">
        <div className="logo">
          <img src={logo} alt="edusmartly" />
        </div>
        <div className="text-center mt-4 name">edusmartly</div>
        <form className="p-3 mt-3" onSubmit={handleSubmit}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Academic Id"
              value={academicId}
              autoComplete="off"
              onChange={(e) => {
                setAcademicId(e.target.value);
              }}
              required
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="password"
              id="pwd"
              placeholder="Password"
              value={password}
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              autoComplete="off"
              onChange={(e) => {
                setacademicPass(e.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className="btn mt-3">
            Login
          </button>
        </form>
        <div className="text-center fs-6">
          <a href="/">Forget password?</a>
        </div>
        <hr />
        <div className="text-center text-danger">
          <strong>Management</strong>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
