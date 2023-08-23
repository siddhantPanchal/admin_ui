import React, { useState } from "react";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import employeeService from "../../services/employee_service";

// Definition of Data Structures used
/**
 * @typedef {Object} Employee - Data on product available to buy
 *
 * @property {string} id - Unique employee ID
 * @property {string} name - The name of the employee
 * @property {number} email - The email of the employee
 * @property {number} role - The role of the employee
 */

/**
 *
 * @param {Employee} employee to display
 * @param {Boolean} selected selected or not
 * @param {Function} handleSelection handle selection
 * @param {Function} handleDeletion handle deletion
 */

export default function EmployeeTile({
  employee,
  selected,
  handleSelection,
  handleDeletion,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [role, setRole] = useState(employee.role);

  return (
    <div
      className={`flex flex-row items-center justify-center mr-4 ml-4 sm:grid sm:grid-cols-5 gap-4 py-3 my-2 hover:rounded-lg hover:border-2 hover:bg-gray-200 ${
        selected ? "bg-yellow-300 rounded-lg" : ""
      } ${isEditing ? "bg-gray-300" : ""}`}
    >
      <label htmlFor={employee.id} aria-disabled hidden>
        select
      </label>
      {/* checkbox for section of employee */}
      <input
        type="checkbox"
        className="checked:bg-yellow-500 h-6 "
        name={employee.id}
        checked={selected}
        onChange={(e) => {
          handleSelection(!selected);
        }}
      />
      {/* render details or text field base on isEditing state */}
      {isEditing ? (
        <>
          {/* for mobile screens */}
          <div className="sm:hidden w-4/5 flex flex-col">
            <section className="flex flex-col">
              {/* input name */}
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Name"
                className="rounded-lg placeholder:px-4  px-4 py-2 mb-1"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {/* input email */}
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter Email"
                className="rounded-lg placeholder:px-4  px-4 py-2 mb-1"
              />
              {/* inout role */}
              <select
                className="rounded-lg placeholder:px-4  px-4 py-2 mb-3"
                name="role"
                id="role"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                value={role}
              >
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>
            </section>
            {/* handle save changes / edit employee */}
            <div className="text-left">
              <button
                type="submit"
                className=" p-4 h-10 rounded-full bg-green-400 inline-flex items-center justify-center text-white relative z-10 w-full"
                onClick={() => {
                  setIsEditing(false);
                  employeeService.editEmployee(employee.id, {
                    name,
                    email,
                    role,
                  });
                }}
              >
                <p className="text-white">Save Changes</p>
              </button>
            </div>
          </div>
          {/* for larges screens */}
          {/* input name */}
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
            className="rounded-full placeholder:ps-4 ps-4  hidden sm:block"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {/* input email */}
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter Email"
            className="rounded-full placeholder:ps-4  ps-4 hidden sm:block"
          />
          {/* input selection */}
          <select
            className="rounded-full placeholder:ps-4  ps-4  hidden sm:block"
            name="role"
            id="role"
            onChange={(e) => {
              setRole(e.target.value);
            }}
            value={role}
          >
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
          {/* handle save changes / edit employee */}
          <div className="text-left">
            <button
              type="submit"
              className="flex-shrink-0 p-4 h-10 rounded-full bg-green-400 sm:inline-flex items-center justify-center text-white relative z-10  hidden"
              onClick={() => {
                setIsEditing(false);
                employeeService.editEmployee(employee.id, {
                  name,
                  email,
                  role,
                });
              }}
            >
              <p className="text-white">Save Changes</p>
            </button>
          </div>
        </>
      ) : (
        <>
          {/* for mobile screens */}
          <div className="sm:hidden w-4/5">
            <section className="">
              <p className="text-2xl">{name}</p>
              <p>
                {email}
                <span className="text-sm"> [{role}]</span>
              </p>
            </section>
            <section className="flex flex-row items-center justify-center gap-1">
              {/* change to edit mode */}
              <button
                className="flex flex-row bg-yellow-500 rounded-lg items-center justify-center w-1/2"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <EditIcon />
                <p>Edit</p>
              </button>
              {/* handle delete employee */}
              <button
                className="flex flex-row text-white bg-red-400 rounded-lg items-center justify-center w-1/2"
                onClick={() => {
                  handleDeletion();
                }}
              >
                <DeleteIcon />
                <p>Delete</p>
              </button>
            </section>
          </div>
          {/*  */}
          <div className="text-left hidden sm:block">{name}</div>
          <div className="text-left hidden sm:block">{email}</div>
          <div className="text-left hidden sm:block">{role}</div>
          <div className="text-left sm:flex sm:gap-2 hidden">
            {/* change to edit mode */}
            <button
              onClick={() => {
                setIsEditing(true);
              }}
            >
              <EditIcon />
            </button>
            {/* handle deletion of employee */}
            <button
              onClick={() => {
                handleDeletion();
              }}
            >
              <DeleteIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
