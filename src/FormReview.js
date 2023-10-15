import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "./Form.css";

export const FormReview = ({
  activeApplication,
  setActiveApplication,
  setApplications,
}) => {
  const navigate = useNavigate();

  const [applicationCost, setApplicationCost] = useState(0);

  const handleSubmit = () => {
    setApplications((prevState) => {
      return [
        ...prevState,
        { ...activeApplication, status: "pending", cost: applicationCost },
      ];
    });
    setActiveApplication({
      companyName: "",
      companyAddress: "",
      uen: "",
      applicantName: "",
      applicantContact: "",
      applicantEmail: "",
      employeeName: "",
      employeeNRIC: "",
      passportNo: "",
      origin: "",
      destination: "",
      from: null,
      to: null,
      status: null,
      cost: 0,
    });
    navigate("/");
  };

  useEffect(() => {
    // get the cost based on origin and destination
  }, []);

  return (
    <div className="form-container">
      <div>
        <h1>Review Details</h1>
        <h3>Company Details</h3>
        <div className="form-field">
          <label>Company Name: </label>
          <div className="margin-left">{activeApplication.companyName}</div>
        </div>
        <div className="form-field">
          <label>Address: </label>
          <div className="margin-left">{activeApplication.companyAddress}</div>
        </div>
        <div className="form-field">
          <label>Unique Entity Number (UEN): </label>
          <div className="margin-left">
            {activeApplication.uen === "" ? "-" : activeApplication.uen}
          </div>
        </div>
        <h3>Applicant Details</h3>

        <div className="form-field">
          <label>Name: </label>
          <div className="margin-left">{activeApplication.applicantName}</div>
        </div>
        <div className="form-field">
          <label>Contact: </label>
          <div className="margin-left">
            {activeApplication.applicantContact}
          </div>
        </div>
        <div className="form-field">
          <label>Email: </label>
          <div className="margin-left">{activeApplication.applicantEmail}</div>
        </div>

        <h3>Employee Details</h3>
        <div className="form-field">
          <label>Name: </label>
          <div className="margin-left">{activeApplication.employeeName}</div>
        </div>
        <div className="form-field">
          <label>NRIC/FIN: </label>
          <div className="margin-left">
            {activeApplication.employeeNRIC === ""
              ? "-"
              : activeApplication.employeeNRIC}
          </div>
        </div>
        <div className="form-field">
          <label>Passport No: </label>
          <div className="margin-left">{activeApplication.passportNo}</div>
        </div>
        <div className="form-field">
          <label>Country of Origin: </label>
          <div className="margin-left">{activeApplication.origin}</div>
        </div>
        <div className="form-field">
          <label>Country of Destination: </label>
          <div className="margin-left">{activeApplication.destination}</div>
        </div>
        <label>Travel Period</label>
        <div className="form-field">
          <label>From: </label>
          <div className="margin-left">
            {activeApplication.from?.toLocaleDateString("en-GB")}
          </div>
          <label className="margin-left">To: </label>
          <div className="margin-left">
            {activeApplication.to?.toLocaleDateString("en-GB")}
          </div>
        </div>

        <button
          onClick={() => {
            navigate("/addApplication");
          }}
        >
          Back
        </button>
        <button className="margin-left" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
