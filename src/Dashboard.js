import DashboardItem from "./DashboardItem";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

const Dashboard = ({ applications, setActiveApplication }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Welcome to XYZ Travel Agency!</h1>
      <header className="dashboard-header">
        <h2>Dashboard</h2>
        <button
          className="create-application-btn"
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
            navigate("/addApplication");
          }}
        >
          Create new Application
        </button>
      </header>

      <div className="dashboard-item-container">
        {applications.length > 0 ? (
          applications.map((item) => {
            const newKey =
              item.companyName +
              "-" +
              item.employeeName +
              "-" +
              item.from.toLocaleDateString("en-GB");
            return (
              <DashboardItem
                key={newKey}
                data={item}
                setActiveApplication={setActiveApplication}
              />
            );
          })
        ) : (
          <div>No existing applications found.</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
