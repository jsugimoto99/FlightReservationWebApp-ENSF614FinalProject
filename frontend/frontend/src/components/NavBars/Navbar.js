import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const Navbar = () => {
  // Function to handle the button click
  const handleClick = () => {
    // Login();
    console.log("Button has been clicked!");
  };

  return (
    <>
      <header className="text-gray-600 body-font dark:bg-gray-800">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img
              src={logo}
              alt="logo"
              style={{
                maxWidth: "200px",
                maxHeight: "30px",
                width: "auto",
                height: "auto",
              }}
            />
            <span className="ml-3 text-xl text-gray-50">Cloud 9 Airlines</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center text-gray-50">
            <Link to="/browseFlights">
              <a className="mr-5 hover:text-green-900">Browse Flights</a>
            </Link>
            <Link to="/myBooking">
              <a className="mr-5 hover:text-green-900">My Bookings</a>
            </Link>
            <Link to="/team">
              <a className="mr-5 hover:text-green-900">Team</a>
            </Link>
          </nav>
          <Link to="login">
            <button
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              onClick={handleClick}
            >
              Login
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        </div>
      </header>
    </>
  );
};

export default Navbar;
