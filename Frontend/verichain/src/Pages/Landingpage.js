import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link,useNavigate,Redirect   } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";


const Landing = () => {


  let navigate = useNavigate(); 
  const change_Sigin = () =>{ 
    let path = `/signin`; 
    navigate(path);
 
  }

  let navigate1 = useNavigate();

  const change_Sigup = () =>{ 
    let path = `/signup`; 
    navigate1(path);
 
  }



  


  return (

    
    <section
      className="main position-absolute h-100 w-100"
      style={{ backgroundColor: "#2E2B2B" }}
    >
      {/* heading            */}
      <div
        class="container position-relative"
        style={{
          backgroundColor: "#161212",
          minWidth: "100vw",
          minHeight: "10vh",
        }}
      >
        <b
          className="navname text-white position-relative py-3"
          style={{ fontSize: "2rem", left: "0%" }}
        >
          VERICHAIN
        </b>
      </div>

      <div className="all container">
        {/* space before id */}

        <div className="space ">
          <p className="space1" style={{ padding: "3rem" }}></p>
        </div>
        {/* id + text box     */}

        <Row>
          <Col></Col>
          <Col>
            <p className="welcom text-white" style={{ fontSize: "2.5rem" }}>
              Unique ID:
            </p>
          </Col>
          <input
            type="text"
            id="name"
            name="name"
            style={{ borderRadius: "20px", width: "60%" }}
          />
          <br />
          <br />
          <Col></Col>
        </Row>

        <div className="space ">
          <p className="space1" style={{ padding: "1rem" }}></p>
        </div>


        {/* //row2 show button */}

        <Row>
          <Col></Col>

          <Col>
            <button type="button" class="bt1 btn-light btn-lg rounded-pill">
              Show
            </button>
          </Col>

          <Col></Col>
        </Row>

        <div className="space ">
          <p className="space1" style={{ padding: "3rem" }}></p>
        </div>

        {/* row3 sign in and signup */}

        <Row>
          <Col>
            <button type="button" class="bt2 btn-light btn-lg rounded-pill" onClick={change_Sigin}>
              Sign in
            </button>
          </Col>

          <Col>
           <p className="txt text-white" style={{  fontSize: "1.5rem" }}>OR </p>
           </Col>

          <Col>
            <button type="button" class="bt3 btn-light btn-lg rounded-pill"  onClick={change_Sigup}>
              Sign up
            </button>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Landing;
