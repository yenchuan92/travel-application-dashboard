import { useNavigate } from "react-router-dom";

import "./DashboardItem.css";

const DashboardItem = ({ data, setActiveApplication }) => {
  const navigate = useNavigate();
  return (
    <div
      className="dashboard-item"
      onClick={() => {
        setActiveApplication(data);
        navigate("/addApplication");
      }}
    >
      <div className="align-end">
        <div className="dashboard-item-status">{data.status}</div>
      </div>
      <div className="dashboard-item-data">
        <label>Company Name: </label>
        <div className="padding-left">{data.companyName}</div>
      </div>

      <div className="dashboard-item-data">
        <label>Applicant Name: </label>
        <div className="padding-left">{data.applicantName}</div>
      </div>
      <div className="dashboard-item-data">
        <label>Applicant Contact: </label>
        <div className="padding-left">{data.applicantContact}</div>
      </div>
      <div className="dashboard-item-data">
        <label>Cost: </label>
        <div className="padding-left">{data.cost}</div>
      </div>
    </div>
  );
};

export default DashboardItem;
