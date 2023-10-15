import "./Form.css";
import { useState, useEffect } from "react";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from "react-router-dom";

// https://gist.github.com/mervintankw/90d5660c6ab03a83ddf77fa8199a0e52
function validateUEN(uen) {
  var debug = true;
  const entityTypeIndicator = [
    "LP",
    "LL",
    "FC",
    "PF",
    "RF",
    "MQ",
    "MM",
    "NB",
    "CC",
    "CS",
    "MB",
    "FM",
    "GS",
    "GA",
    "GB",
    "DP",
    "CP",
    "NR",
    "CM",
    "CD",
    "MD",
    "HS",
    "VH",
    "CH",
    "MH",
    "CL",
    "XL",
    "CX",
    "RP",
    "TU",
    "TC",
    "FB",
    "FN",
    "PA",
    "PB",
    "SS",
    "MC",
    "SM",
  ];

  if (debug) {
    console.log("(A) Businesses registered with ACRA");
    console.log("(B) Local companies registered with ACRA");
    console.log("(C) All other entities which will be issued new UEN");
  }

  // check that uen is not empty
  if (!uen || String(uen) === "") {
    if (debug) {
      console.log("UEN is empty");
    }
    return false;
  }

  // check if uen is 9 or 10 digits
  if (uen.length < 9 || uen.length > 10) {
    if (debug) {
      console.log("UEN is not 9 or 10 digits");
    }
    return false;
  }

  uen = uen.toUpperCase();
  var uenStrArray = uen.split("");

  // (A) Businesses registered with ACRA
  if (uenStrArray.length === 9) {
    // check that last character is a letter
    if (!isNaN(uenStrArray[uenStrArray.length - 1])) {
      if (debug) {
        console.log("(A) last character is not an alphabet");
      }
      return false;
    }

    for (var i = 0; i < uenStrArray.length - 1; i++) {
      // check that first 8 letters are all numbers
      if (isNaN(uenStrArray[i])) {
        if (debug) {
          console.log("(A) there are non-numbers in 1st to 8th letters");
        }
        return false;
      }
    }

    // (A) Businesses registered with ACRA (SUCCESS)
    if (debug) {
      console.log("valid (A) Businesses registered with ACRA");
    }
    return true;
  } else if (uenStrArray.length === 10) {
    // check that last character is a letter
    if (!isNaN(uenStrArray[uenStrArray.length - 1])) {
      if (debug) {
        console.log("(B)(C) last character is not an alphabet");
      }
      return false;
    }

    // (B) Local companies registered with ACRA
    if (
      !isNaN(uenStrArray[0]) &&
      !isNaN(uenStrArray[1]) &&
      !isNaN(uenStrArray[2]) &&
      !isNaN(uenStrArray[3])
    ) {
      // check that 5th to 9th letters are all numbers
      if (
        !isNaN(uenStrArray[4]) &&
        !isNaN(uenStrArray[5]) &&
        !isNaN(uenStrArray[6]) &&
        !isNaN(uenStrArray[7]) &&
        !isNaN(uenStrArray[8])
      ) {
        // (B) Local companies registered with ACRA (SUCCESS)
        if (debug) {
          console.log("valid (B) Local companies registered with ACRA");
        }
        return true;
      } else {
        if (debug) {
          console.log("(B) there are non-numbers in 5th to 9th letters");
        }
        return false;
      }
    }
    // (C) All other entities which will be issued new UEN
    else {
      // check that 1st letter is either T or S or R
      if (
        uenStrArray[0] !== "T" &&
        uenStrArray[0] !== "S" &&
        uenStrArray[0] !== "R"
      ) {
        if (debug) {
          console.log("(C) 1st letter is incorrect");
        }
        return false;
      }

      // check that 2nd and 3rd letters are numbers only
      if (isNaN(uenStrArray[1]) || isNaN(uenStrArray[2])) {
        if (debug) {
          console.log("(C) 2nd and 3rd letter is incorrect");
        }
        return false;
      }

      // check that 4th letter is an alphabet
      if (!isNaN(uenStrArray[3])) {
        if (debug) {
          console.log("(C) 4th letter is not an alphabet");
        }
        return false;
      }

      // check entity-type indicator
      var entityTypeMatch = false,
        entityType = String(uenStrArray[3]) + String(uenStrArray[4]);
      for (var i = 0; i < entityTypeIndicator.length; i++) {
        if (String(entityTypeIndicator[i]) === String(entityType)) {
          entityTypeMatch = true;
        }
      }
      if (!entityTypeMatch) {
        if (debug) {
          console.log("(C) entity-type indicator is invalid");
        }
        return false;
      }

      // check that 6th to 9th letters are numbers only
      if (
        isNaN(uenStrArray[5]) ||
        isNaN(uenStrArray[6]) ||
        isNaN(uenStrArray[7]) ||
        isNaN(uenStrArray[8])
      ) {
        if (debug) {
          console.log("(C) 2nd and 3rd letter is incorrect");
        }
        return false;
      }

      // (C) All other entities which will be issued new UEN (SUCCESS)
      if (debug) {
        console.log(
          "valid (C) All other entities which will be issued new UEN"
        );
      }
      return true;
    }
  }

  return false;
}

export const Form = ({ activeApplication, setActiveApplication }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  const [formError, setFormError] = useState({
    companyName: false,
    companyAddress: false,
    uen: false,
    applicantName: false,
    applicantContact: false,
    applicantEmail: false,
    employeeName: false,
    passportNo: false,
    origin: false,
    destination: false,
    from: false,
    to: false,
  });

  useEffect(() => {
    setFormData(activeApplication);
  }, [activeApplication]);

  const validateFields = (data) => {
    const initialErrorState = {
      companyName: false,
      companyAddress: false,
      uen: false,
      applicantName: false,
      applicantContact: false,
      applicantEmail: false,
      employeeName: false,
      passportNo: false,
      origin: false,
      destination: false,
      from: false,
      to: false,
    };
    let result = true;
    if (!data.companyName) {
      initialErrorState.companyName = true;
      result = false;
    }
    if (!data.companyAddress) {
      initialErrorState.companyAddress = true;
      result = false;
    }
    if (!data.applicantName) {
      initialErrorState.applicantName = true;
      result = false;
    }
    if (!data.applicantContact) {
      initialErrorState.applicantContact = true;
      result = false;
    }
    if (!data.employeeName) {
      initialErrorState.employeeName = true;
      result = false;
    }
    if (!data.passportNo) {
      initialErrorState.passportNo = true;
      result = false;
    }
    if (!data.origin) {
      initialErrorState.origin = true;
      result = false;
    }
    if (!data.destination) {
      initialErrorState.destination = true;
      result = false;
    }
    if (!data.from) {
      initialErrorState.from = true;
      result = false;
    }
    if (!data.to) {
      initialErrorState.to = true;
      result = false;
    }
    if (
      !data.applicantEmail ||
      !data.applicantEmail.match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
    ) {
      initialErrorState.applicantEmail = true;
      result = false;
    }
    if (data.uen && !validateUEN(data.uen)) {
      initialErrorState.uen = true;
      result = false;
    }

    setFormError(initialErrorState);
    console.log(initialErrorState, result);
    return result;
  };

  const onFormDataChange = (e, type) => {
    const newObj = { ...formData };
    if (type !== "from" && type !== "to") {
      newObj[type] = e.target.value;
    } else {
      newObj[type] = e;
    }
    setFormData(newObj);

    setFormError((prevState) => {
      const newObj = { ...prevState };
      newObj[type] = false;
      return newObj;
    });
  };

  const handleContinueClick = () => {
    if (validateFields(formData)) {
      //set to app local state, then push to next route
      setActiveApplication(formData);
      navigate("/reviewApplication");
    }
  };

  return (
    <div className="form-container">
      <div>
        <h1>Create New Application</h1>
        <div>
          <h3>Company Details</h3>
          <div className="form-field">
            <label>Company Name*: </label>
            <input
              className={formError.companyName ? "input-border-red" : null}
              defaultValue={formData.companyName}
              onChange={(e) => {
                onFormDataChange(e, "companyName");
              }}
            />
            {formError.companyName && (
              <div className="error-text">
                Company Name cannot be left blank!
              </div>
            )}
          </div>
          <div className="form-field">
            <label>Address*: </label>
            <input
              className={formError.companyAddress ? "input-border-red" : null}
              defaultValue={formData.companyAddress}
              onChange={(e) => {
                onFormDataChange(e, "companyAddress");
              }}
            />
            {formError.companyAddress && (
              <div className="error-text">
                Company Address cannot be left blank!
              </div>
            )}
          </div>
          <div className="form-field">
            <label>Unique Entity Number (UEN): </label>
            <input
              className={formError.uen ? "input-border-red" : null}
              defaultValue={formData.uen}
              onChange={(e) => {
                onFormDataChange(e, "uen");
              }}
            />
            {formError.uen && (
              <div className="error-text">Invalid UEN format!</div>
            )}
          </div>
        </div>
        <div>
          <h3>Applicant Details</h3>
          <div className="form-field">
            <label>Name*: </label>
            <input
              className={formError.applicantName ? "input-border-red" : null}
              defaultValue={formData.applicantName}
              onChange={(e) => {
                onFormDataChange(e, "applicantName");
              }}
            />
            {formError.applicantName && (
              <div className="error-text">
                Applicant Name cannot be left blank!
              </div>
            )}
          </div>
          <div className="form-field">
            <label>Contact*: </label>
            <input
              className={formError.applicantContact ? "input-border-red" : null}
              defaultValue={formData.applicantContact}
              onChange={(e) => {
                onFormDataChange(e, "applicantContact");
              }}
            />
            {formError.applicantContact && (
              <div className="error-text">
                Applicant Contact cannot be left blank!
              </div>
            )}
          </div>
          <div className="form-field">
            <label>Email*: </label>
            <input
              className={formError.applicantEmail ? "input-border-red" : null}
              defaultValue={formData.applicantEmail}
              onChange={(e) => {
                onFormDataChange(e, "applicantEmail");
              }}
            />
            {formError.applicantEmail && (
              <div className="error-text">Invalid email format!</div>
            )}
          </div>
        </div>
        <div className="employee-details">
          <h3>Employee Details</h3>
          <div className="form-field">
            <label>Name*: </label>
            <input
              className={formError.employeeName ? "input-border-red" : null}
              defaultValue={formData.employeeName}
              onChange={(e) => {
                onFormDataChange(e, "employeeName");
              }}
            />
            {formError.employeeName && (
              <div className="error-text">
                Employee Name cannot be left blank!
              </div>
            )}
          </div>
          <div className="form-field">
            <label>NRIC/FIN: </label>
            <input
              defaultValue={formData.employeeNRIC}
              onChange={(e) => {
                onFormDataChange(e, "employeeNRIC");
              }}
            />
          </div>
          <div className="form-field">
            <label>Passport No*: </label>
            <input
              className={formError.passportNo ? "input-border-red" : null}
              defaultValue={formData.passportNo}
              onChange={(e) => {
                onFormDataChange(e, "passportNo");
              }}
            />
            {formError.passportNo && (
              <div className="error-text">
                Passport Number cannot be left blank!
              </div>
            )}
          </div>
          <div className="form-field">
            <label>Country of Origin*: </label>
            <input
              className={formError.origin ? "input-border-red" : null}
              defaultValue={formData.origin}
              onChange={(e) => {
                onFormDataChange(e, "origin");
              }}
            />
            {formError.origin && (
              <div className="error-text">
                Country of Origin cannot be left blank!
              </div>
            )}
          </div>
          <div className="form-field">
            <label>Country of Destination*: </label>
            <input
              className={formError.destination ? "input-border-red" : null}
              defaultValue={formData.destination}
              onChange={(e) => {
                onFormDataChange(e, "destination");
              }}
            />
            {formError.destination && (
              <div className="error-text">
                Country of Destination cannot be left blank!
              </div>
            )}
          </div>
          <label>Travel Period</label>
          <div className="form-field">
            <label>From*: </label>
            <ReactDatePicker
              className={formError.from ? "input-border-red" : null}
              selected={formData.from ?? formData.from}
              onChange={(e) => {
                onFormDataChange(e, "from");
              }}
            />
            {formError.from && (
              <div className="error-text">
                Travel Period From cannot be left blank!
              </div>
            )}
            <label className="margin-left">To*: </label>
            <ReactDatePicker
              className={formError.to ? "input-border-red" : null}
              selected={formData.to ?? formData.to}
              onChange={(e) => {
                onFormDataChange(e, "to");
              }}
              minDate={formData.from ?? null}
            />
            {formError.to && (
              <div className="error-text">
                Travel Period To cannot be left blank!
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => {
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
          }}
        >
          Back
        </button>
        <button className="margin-left" onClick={handleContinueClick}>
          Continue
        </button>
      </div>
    </div>
  );
};
