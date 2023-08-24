import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import employeeService from "./services/employee_service";
import EmployeeList from "./components/employee/EmployeeList";
import Footer from "./components/footer/Footer";
import getPaginationDetails from "./services/pagination_services";
import config from "./config";

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [pages, setPages] = useState(0);

  const [search, setSearch] = useState("");

  useEffect(() => {
    employeeService.getEmployees().then((value) => {
      const currentPage = 0;

      const { pages, pagedEmployees } = getPaginationDetails(
        value,
        config.maxEmpoyeesOnSamePage,
        currentPage
      );
      setEmployees(pagedEmployees);
      setPages(pages);
    });
  }, []);

  const searchEmployees = async (searchKey, currentPage = 0) => {
    const employees = await employeeService.getEmployees();
    const filtered =
      searchKey === ""
        ? employees
        : employees.filter(
            (emp) =>
              emp.name.toLowerCase().includes(searchKey) ||
              emp.role.toLowerCase().includes(searchKey) ||
              emp.email.toLowerCase().includes(searchKey)
          );
    const { pages, pagedEmployees } = getPaginationDetails(
      filtered,
      config.maxEmpoyeesOnSamePage,
      currentPage
    );
    setEmployees(pagedEmployees);
    setPages(pages);
  };

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
        handleSearch={async (newSearch) => {
          searchEmployees(search);
          setSearch(newSearch);
        }}
      />

      {/* Footer for pagination */}
      <Footer
        employees={employees}
        setEmployees={setEmployees}
        selectedEmployees={selectedEmployees}
        pages={pages}
        setPages={setPages}
        onPageChanged={async (currentPage) => {
          searchEmployees(search, currentPage);
          setPages(pages);
        }}
      />
    </div>
  );
}

export default App;
