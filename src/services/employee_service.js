import axios from "axios";

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
 * EmployeeService class for manipulating employees data
 */

class EmployeeService {
  employees = [];

  /**
   * This function will return all the employees
   *
   * sample example for what API should return
   * [
   *     {
   *       "id": "1",
   *       "name": "Aaron Miles",
   *       "email": "aaron@mailinator.com",
   *       "role": "member"
   *     },
   *     {
   *       "id": "2",
   *       "name": "Aishwarya Naik",
   *       "email": "aishwarya@mailinator.com",
   *       "role": "member"
   *     },
   *     {
   *       "id": "3",
   *       "name": "Arvind Kumar",
   *       "email": "arvind@mailinator.com",
   *       "role": "admin"
   *     }
   * ]
   *
   * @returns {Promise<Array<Employee>>} employees
   *
   */
  getEmployees = async () => {
    if (this.employees.length > 0) {
      return this.employees;
    }
    try {
      const res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );

      this.employees = res.data;
      return this.employees;
    } catch (error) {
      this.employees = [];
      return [];
    }
  };

  /**
   *
   * This function edit the employee details by its id
   *
   * @param {string} id id of the employee to edit info
   * @param {Object} newEmployee
   *
   */
  editEmployee = (id, newEmployee) => {
    const index = this.employees.findIndex((value) => value.id === id);
    if (index !== -1) {
      const oldEmp = this.employees[index];
      this.employees[index] = {
        ...oldEmp,
        name: newEmployee.name ?? oldEmp.name,
        email: newEmployee.email ?? oldEmp.email,
        role: newEmployee.role ?? oldEmp.role,
      };
    }
  };

  /**
   *
   * This function delete the employee by its id
   *
   * @param {string} id id of the employee to delete info
   * @returns {Array<Employee>} after deletion
   */
  deleteEmployee = (id) => {
    const index = this.employees.findIndex((value) => value.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
    }
    return this.employees;
  };
}

// global object
const employeeService = new EmployeeService();

export default employeeService;
