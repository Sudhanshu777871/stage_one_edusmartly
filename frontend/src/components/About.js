import React from "react";
import "./css/About.css";
export default function About() {
  return (
    <>
      <div className="container mt-4">
        <h1 className="mainHead">Welcome To Edusmartly</h1>
        <hr
          style={{ border: "2px solid white", width: "50%", marginLeft: "25%" }}
        />
        <p className="paraAbout">
          At Edusmartly, we are dedicated to revolutionizing the academic world
          through innovative, cost-effective, and secure ERP solutions. Founded
          in 2022, our journey has been driven by a passion for enhancing
          educational institutions' efficiency and effectiveness. We firmly
          believe that technology should empower educators, students, and
          administrators to achieve their academic goals seamlessly.
        </p>

        <h2>Our Mission</h2>
        <p className="textSize">
          Our mission is simple yet profound: to provide cutting-edge ERP
          services tailored to the unique needs of educational institutions. We
          aim to bridge the gap between traditional academic management methods
          and modern, efficient solutions. Our commitment to affordability
          ensures that institutions of all sizes can access the tools they need
          to thrive.
        </p>

        <h2>Why Choose Edusmartly?</h2>
        <p className="choosePoints">
          <span>&#9679;</span> Modern Technologies for a Secure Future
        </p>

        <p className="choosePoints">
          <span>&#9679;</span> Cost-Effective Excellence
        </p>

        <p className="choosePoints">
          <span>&#9679;</span> Tailored Solutions
        </p>

        <p className="choosePoints">
          <span>&#9679;</span> A Passion for Education
        </p>

        <hr
          style={{ border: "2px solid white", width: "50%", marginLeft: "25%" }}
        />

        {/* code for adding the social media */}
        <div className="row d-flex justify-content-center">
          <i className="fa-brands fa-facebook brandStyle"></i>
          <i className="fa-brands fa-instagram brandStyle"></i>
          <i className="fa-brands fa-youtube brandStyle"></i>
        </div>
      </div>
    </>
  );
}
