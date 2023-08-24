import React, { useEffect, useState } from "react";
import EmployeeTile from "./EmployeeTile";

// Definition of Data Structures used
/**
 * @typedef {Object} Employee - Data on product available to buy
 *
 * @property {string} id - Unique employee ID
 * @property {string} name - The name of the employee
 * @property {string} email - The email of the employee
 * @property {string} role - The role of the employee
 */

/**
 * @param {Array<Employee>} employees to display the employees
 * @param {Function} handleDeletion to handle the deletion
 * @param {Function} handleSelected to handle the selected employees
 *
 */
export default function EmployeeList({
  employees,
  handleDeletion,
  handleSelected,
  handleSearch,
}) {
  const [selectAll, setSelectAll] = useState(false);
  const [selectEmployees, setSelectedEmployees] = useState([]);

  // const [search, setSearch] = useState("");

  // when employee get selected
  useEffect(() => {
    handleSelected(selectEmployees);
  }, [selectEmployees]);

  // when employees get changed by parent
  useEffect(() => {
    setSelectAll(false);
  }, [employees]);

  return (
    <div className="">
      <div className="flex flex-col items-center">
        <input
          className="container rounded-lg placeholder:px-4 px-4 py-2  my-2 border border-gray-700"
          type="search"
          name="search"
          id="search"
          placeholder="Search Employee"
          onChange={(e) => {
            const filterKey = e.target.value.trim().toLowerCase();
            // if (!filterKey) return;

            // setSearch(filterKey);
            handleSearch(filterKey);
          }}
        />
      </div>

      <div className="flex flex-row ml-4 sm:grid sm:grid-cols-5 gap-4 mb-4 items-center">
        {/* input select all employees */}
        <label htmlFor="selectAll" aria-disabled hidden>
          select all
        </label>
        <input
          type="checkbox"
          className="h-6"
          name="selectAll"
          checked={selectAll}
          onChange={(e) => {
            setSelectAll(!selectAll);
            if (!selectAll) {
              setSelectedEmployees(employees.map((emp) => emp.id));
            } else {
              setSelectedEmployees([]);
            }
          }}
        />
        {/* only for mobile screens */}
        <div className="text-left text-xl font-semibold block sm:hidden grow">
          Select all
        </div>
        <div className="text-left text-xl font-semibold hidden sm:block">
          Name
        </div>
        <div className="text-left text-xl font-semibold hidden sm:block">
          Email
        </div>
        <div className=" text-left text-xl font-semibold w-10 hidden sm:block">
          Role
        </div>
        <div className=" text-left text-xl font-semibold w-10 hidden sm:block">
          Action
        </div>
      </div>
      {/* display all the employees */}
      {employees.map((emp) => {
        return (
          <EmployeeTile
            employee={emp}
            key={emp.id}
            selected={selectEmployees && selectEmployees.includes(emp.id)}
            handleSelection={(checked) => {
              if (checked) {
                setSelectedEmployees([...selectEmployees, emp.id]);
              } else {
                setSelectedEmployees((selectEmployees) => {
                  return selectEmployees.filter((id) => id !== emp.id);
                });
                setSelectAll(false);
              }
            }}
            handleDeletion={() => {
              handleDeletion(emp.id);
            }}
          />
        );
      })}
    </div>
  );
}
