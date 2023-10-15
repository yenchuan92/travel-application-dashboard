import { Routes, Route } from "react-router-dom";

import { Form } from "./Form";
import { FormReview } from "./FormReview";
import Dashboard from "./Dashboard";

export default function AppRoutes({
  activeApplication,
  setActiveApplication,
  applications,
  setApplications,
}) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            applications={applications}
            setActiveApplication={setActiveApplication}
          />
        }
      />
      <Route
        path="/addApplication"
        element={
          <Form
            activeApplication={activeApplication}
            setActiveApplication={setActiveApplication}
          />
        }
      />
      <Route
        path="/reviewApplication"
        element={
          <FormReview
            activeApplication={activeApplication}
            setActiveApplication={setActiveApplication}
            setApplications={setApplications}
          />
        }
      />
    </Routes>
  );
}
