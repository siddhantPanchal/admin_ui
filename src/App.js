import Header from "./components/header/Header";
import { useState } from "react";
import employeeService from "./services/employee_service";
import EmployeeList from "./components/employee/EmployeeList";
import Footer from "./components/footer/Footer";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  return (
    <div>
      {/* Header of page */}
      <Header />
      {/* List of employees to be displayed */}
      <EmployeeList
        employees={employees}
        handleDeletion={async (id) => {
          const newEmployee = employeeService.deleteEmployee(id);
          setEmployees(newEmployee);
        }}
        handleSelected={(selectedEmployees) => {
          setSelectedEmployees(selectedEmployees);
        }}
      />

      {/* Footer for pagination */}
      <Footer
        setEmployees={setEmployees}
        selectedEmployees={selectedEmployees}
      />
    </div>
  );
}

export default App;
