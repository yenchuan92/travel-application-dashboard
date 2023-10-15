// import "./App.css";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  const [applications, setApplications] = useState([]);
  const [activeApplication, setActiveApplication] = useState({
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
  return (
    <div>
      <BrowserRouter>
        <AppRoutes
          applications={applications}
          setApplications={setApplications}
          activeApplication={activeApplication}
          setActiveApplication={setActiveApplication}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
