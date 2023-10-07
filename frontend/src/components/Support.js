import React from "react";
import "./css/Support.css";
export default function Support() {
  return (
    <>
      <div className="container mt-4">
        <h1 className="mainHead">Welcome To Edusmartly Support</h1>
        <hr
          style={{
            border: "2px solid white",
            width: "50%",
            marginLeft: "25%",
            marginBottom: "50px",
          }}
        />

        {/* CODE FOR MAKING THE CARDS */}

        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="card" style={{ width: "20rem", height: "300px" }}>
                <div className="card-body">
                  <h5 className="card-title ">Contact us</h5>
                  <h6 className="card-subtitle mb-2 text-muted d-flex justify-content-center">
                    <i className="fa-solid fa-envelope contactIconStyle"></i>
                  </h6>
                  <p className="card-text contentCardItms">
                    edusmartlyconnect@gmail.com edusmartlysupport@gmail.com
                  </p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="card" style={{ width: "20rem", height: "300px" }}>
                <div className="card-body">
                  <h5 className="card-title">Contact us</h5>
                  <h6 className="card-subtitle mb-2 text-muted d-flex justify-content-center">
                    <i className="fa-solid fa-phone contactIconStyle"></i>
                  </h6>
                  <p className="card-text contentCardItms">
                    +91-8115830551 <br /> +91-63867001815
                  </p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="card" style={{ width: "20rem", height: "300px" }}>
                <div className="card-body">
                  <h5 className="card-title">Contact us</h5>
                  <h6 className="card-subtitle mb-2 text-muted d-flex justify-content-center">
                    <i className="fa-solid fa-message contactIconStyle"></i>
                  </h6>
                  <button
                    className="btn btn-danger messageBtnStyle"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    Message Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr
          style={{
            border: "2px solid white",
            width: "50%",
            marginLeft: "25%",
            marginTop: "50px",
          }}
        />
        {/* code for adding the social media */}
        <div className="row d-flex justify-content-center socialMediaStyle">
          <i className="fa-brands fa-facebook brandStyle"></i>
          <i className="fa-brands fa-instagram brandStyle"></i>
          <i className="fa-brands fa-youtube brandStyle"></i>
        </div>
      </div>

      {/* CODE FOR MODAL */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark" id="exampleModalLabel">
                Fell Free To Connect Us, We Are Happy To Help You
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="formGroupExampleInput2">Another label</label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Enter The Subject"
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">
                  Example textarea
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Enter You Message Here...."
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Send <i className="fa-regular fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
