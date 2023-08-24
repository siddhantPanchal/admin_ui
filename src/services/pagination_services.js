// set employees who should present on current page
export default function getPaginationDetails(
  employees,
  maxEmpoyeesOnSamePage,
  currentPage
) {
  const pages = Math.ceil(employees.length / maxEmpoyeesOnSamePage);
  const start = currentPage * maxEmpoyeesOnSamePage;
  const end = start + maxEmpoyeesOnSamePage;
  let pagedEmployees = [];
  if (end > employees.length) {
    pagedEmployees = employees.slice(start);
  } else {
    pagedEmployees = employees.slice(start, end);
  }

  return {
    pages,
    pagedEmployees,
  };
}
