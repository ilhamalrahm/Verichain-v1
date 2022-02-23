import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { sha256 } from "js-sha256";

const Orgpage = () => {
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
        <div className="space">
          <p className="space1" style={{ Padding: "3rem" }}></p>
        </div>

        {/* upload */}

        <div className="upload">
          <Row>
            <Col>
              <p className="upload text-white" style={{ fontSize: "2.5rem" }}>
                Upload:
              </p>
            </Col>
            <Col>

            <button type="button" class="bt3 btn-light btn-lg ">
                Upload
              </button>

            </Col>
          </Row>

          {/* linked email */}

          <Row>
            <Col></Col>
            <Col>
              <p className="welcom text-white" style={{ fontSize: "2.5rem" }}>
                Linked Email:
              </p>
            </Col>
            <input
              type="text"
              id="name"
              name="name"
              style={{ borderRadius: "20px", width: "50%" }}
            />
            <br />
            <br />
            <Col></Col>
          </Row>

          <div className="space ">
            <p className="space1" style={{ padding: "1.5rem" }}></p>
          </div>

          {/* add button */}

          <Row>
            <Col></Col>

            <Col></Col>

            <Col>
              <button type="button" class="bt3 btn-light btn-lg rounded-pill">
                ADD
              </button>
            </Col>
          </Row>
        </div>
      </div>

      {/* viewing section */}

      

      <div className="list position-relative w-100 px-0 mx-0">
        <p className="list text-white" style={{ fontSize: "1.5rem" }}>
          List of Certificates :
        </p>
      </div>

      <div
        className="container position-relative"
        style={{
          backgroundColor: "#161212",
          width: "70%",
          height: "60%",
          borderRadius: "20px",
          overflowY: "scroll",
        }}
      >
        <PdfComponent href="none" />
        <PdfComponent href="none" />
        <PdfComponent href="none" />
      </div>
    </section>
  );
};


const PdfComponent=(props)=>{
  return(

      <div className="pdfcontainer position-relative text-start py-2 my-3 px-2" style={{width:"60%",height:"10%",borderRadius:"20px",backgroundColor:"#676363"}}>
          <a href={props.href} className="pdftag text-start p-0 m-0" style={{color:"white", textDecoration:"none"}}> PDF 1 {props.href}</a>
      </div>

  );
}






export default Orgpage;
