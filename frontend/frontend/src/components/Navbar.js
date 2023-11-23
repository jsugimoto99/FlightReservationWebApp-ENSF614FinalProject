import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

function Navbar() {
  
  // Function to handle the button click
  const handleClick = () => {
    // Login();
    console.log("Button has been a  clicked!");
  };
  return (
    <>
      <header class="text-gray-600 body-font">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src={logo} alt="logo" style={{ maxWidth: '200px', maxHeight: '30px', width: 'auto', height: 'auto' }} />
            <Link to="/">
            <span class="ml-3 text-xl">Cloud 9 Airlines</span>
            </Link>
          </a>
          <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a class="mr-5 hover:text-gray-900">First Link</a>
            <a class="mr-5 hover:text-gray-900">Second Link</a>
            <a class="mr-5 hover:text-gray-900">Third Link</a>
            <a class="mr-5 hover:text-gray-900">Fourth Link</a>
          </nav>
          <Link to="login">
          <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          onClick={handleClick()}>
            Login
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-4 h-4 ml-1"
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
}

export default Navbar;