import React, { useEffect, useState } from "react";
import employeeService from "../../services/employee_service";

export default function Footer({ setEmployees, selectedEmployees }) {
  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState(0);

  const maxEmpoyeesOnSamePage = 10;

  // set employees who should present on current page
  function pagination(employees) {
    setPages(Math.ceil(employees.length / maxEmpoyeesOnSamePage));
    const start = currentPage * maxEmpoyeesOnSamePage;
    const end = start + maxEmpoyeesOnSamePage;
    let pagedEmployees = [];
    if (end > employees.length) {
      pagedEmployees = employees.slice(start);
    } else {
      pagedEmployees = employees.slice(start, end);
    }
    setEmployees(pagedEmployees);
  }

  // get all indexed pagination button to navigate specific page
  const getPaginationButtons = (max) => {
    const buttons = [];
    let start = pages - max === 0 ? 0 : currentPage;
    let end = start + max;
    if (end > pages) {
      end = pages;
    }

    for (let index = start; index < end; index++) {
      buttons.push(
        <button
          className={`flex-shrink-0 w-10 h-10 rounded-full  inline-flex items-center justify-center text-white relative z-10  border-black  ${
            index === currentPage ? "border-2" : "bg-yellow-500"
          }`}
          key={index}
          onClick={() => {
            setCurrentPage(index);
          }}
        >
          <p className="text-black">{index + 1}</p>
        </button>
      );
    }
    return buttons;
  };

  // if current page get changed then set the current page employees
  useEffect(() => {
    employeeService.getEmployees().then((value) => {
      pagination(value);
    });
  }, [currentPage]);

  return (
    <footer className="">
      <div className="container sm:flex sm:flex-wrap items-center justify-center p-4 gap-10 w-full">
        {/* Delete All Button */}
        <button
          className="flex-shrink-0 p-4 h-10 rounded-full bg-red-400 inline-flex items-center justify-center text-white relative z-10 mb-4 sm:mb-0"
          onClick={() => {
            console.log(selectedEmployees);
            for (const emp of selectedEmployees) {
              employeeService.deleteEmployee(emp);
            }
            employeeService.getEmployees().then((value) => {
              pagination(value);
            });
          }}
        >
          <p className="text-white">Delete Selected</p>
        </button>
        {/* Pagination buttons */}
        <section className="flex flex-row justify-between sm:gap-6">
          {/* go to the 1st page button */}
          <button
            className={`flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-black relative z-10 ${
              currentPage === 0 ? "bg-yellow-200 text-gray-400" : ""
            }`}
            onClick={() => {
              setCurrentPage(0);
            }}
          >
            <p className="">{"<<"}</p>
          </button>

          {/* previous page button  */}
          <button
            className={`flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-black relative z-10 ${
              currentPage === 0 ? "bg-yellow-200 text-gray-400" : ""
            }`}
            onClick={() => {
              setCurrentPage((state) => {
                if (state > 0) return state - 1;
                return state;
              });
            }}
          >
            <p className="">{"<"}</p>
          </button>

          {/* show all indexed page button for big screens */}
          <section className="hidden sm:flex sm:flex-row sm:gap-2">
            {getPaginationButtons(pages)}
          </section>
          {/* show only 2 indexed pagee buttons for mobile screens*/}
          <section className="sm:hidden flex flex-row gap-2">
            {getPaginationButtons(2)}
          </section>

          {/* next page button */}
          <button
            className={`flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-black relative z-10 ${
              currentPage === pages - 1 ? "bg-yellow-200 text-gray-400" : ""
            }`}
            onClick={() => {
              setCurrentPage((state) => (state + 1) % pages);
            }}
          >
            <p className="">{">"}</p>
          </button>

          {/* go to the last page button */}
          <button
            className={`flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-black relative z-10 ${
              currentPage === pages - 1 ? "bg-yellow-200 text-gray-400" : ""
            }`}
            onClick={() => {
              setCurrentPage(pages - 1);
            }}
          >
            <p className="">{">>"}</p>
          </button>
        </section>
      </div>
    </footer>
  );
}
