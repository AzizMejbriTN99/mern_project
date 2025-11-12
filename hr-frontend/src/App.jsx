import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmployeePage from "./pages/EmployeePage";
import DepartmentPage from "./pages/DepartmentPage";
import SalaryPage from "./pages/SalaryPage";
import AuditPage from "./pages/AuditPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/employees">Employees</Link> | 
        <Link to="/departments">Departments</Link> | 
        <Link to="/salaries">Salaries</Link> | 
      </nav>
      <Routes>
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/departments" element={<DepartmentPage />} />
        <Route path="/salaries" element={<SalaryPage />} />
      </Routes>
    </Router>
  );
}

export default App
