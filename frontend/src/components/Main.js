import { React } from "react";
import "./css/Main.css";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { Outlet, Link } from "react-router-dom";

export default function Main() {
  // code for changing mode through redux
  const mode = useSelector((state) => state.myMode);

  return (
    <>
      {<Navbar />}
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* side navbar col */}
          <div
            className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sideNabvarCol"
            style={
              mode
                ? { backgroundColor: "black" }
                : { backgroundColor: "#010f1a" }
            }
          >
            {/* main code of button starts here */}
            <Link to=""><button className="btn btn-danger sideNav mt-5">
              Home{" "}
              <i
                className="fa-solid fa-house iconSideNav"
                style={{ color: "#f4f5f5" }}
              ></i>{" "}
            </button></Link>

            <Link to="/managefees"> <button className="btn btn-info sideNav">
              Manange Fees{" "}
              <i
                className="fa-solid fa-money-bill-wave iconSideNav"
                style={{ color: "#f4f5f5" }}
              ></i>{" "}
            </button></Link>

            <Link to="/newadmission"> <button className="btn btn-info sideNav">
              New Admission{" "}
              <i
                className="fa-solid fa-user iconSideNav"
                style={{ color: "#f4f5f5" }}
              ></i>{" "}
            </button></Link>

            <Link to="/feestructure"><button className="btn btn-info sideNav">
              Fee Structure{" "}
              <i
                className="fa-solid fa-table iconSideNav"
                style={{ color: "#f4f5f5" }}
              ></i>{" "}
            </button></Link>

            <Link to="/facultyrecord"><button className="btn btn-info sideNav">
              Faculty Record{" "}
              <i
                className="fa-solid fa-user-tie iconSideNav"
                style={{ color: "#f4f5f5" }}
              ></i>{" "}
            </button></Link>

            <Link to="/managefaculty"> <button className="btn btn-info sideNav">
              Manage Faculty{" "}
              <i
                className="fa-solid fa-people-roof iconSideNav"
                style={{ color: "#f4f5f5" }}
              ></i>{" "}
            </button></Link>

            <Link to="/setting">  <button className="btn btn-info sideNav">
              Setting{" "}
              <i
                className="fa-solid fa-gear iconSideNav"
                style={{ color: "#f4f5f5" }}
              ></i>{" "}
            </button></Link>
          </div>

          <div
            className="col p-0 m-0"
            style={
              mode
                ? { backgroundColor: "#171616", color: "white" }
                : { backgroundColor: "rgb(4, 22, 52)", color: "white" }
            }
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
