import React from "react";

// Header of admin page
export default function Header() {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap px-auto py-2 flex-row items-center justify-between">
        {/* Brand */}
        <a
          className="flex title-font font-medium items-center text-gray-900"
          href="/"
        >
          <span className="ml-3 text-xl">Admin UI</span>
        </a>
        <nav className="flex flex-wrap  text-base justify-center">
          <a className="mr-5 px-3 py-1 hover:bg-gray-100 rounded" href="/">
            Home
          </a>
          <a className="mr-5  px-3 py-1 hover:bg-gray-100 rounded" href="/">
            Employees
          </a>
        </nav>
        <section className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center  relative z-10">
          <p className="text-black">A</p>
        </section>
      </div>
    </header>
  );
}
