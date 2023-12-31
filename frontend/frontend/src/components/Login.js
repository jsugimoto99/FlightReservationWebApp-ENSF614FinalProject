import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import axios from "axios";

function Login({ updateUserAttributes }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userErrorMessage, setUserErrorMessage] = useState(""); // New state for error message
  const [passErrorMessage, setPassErrorMessage] = useState(""); // New state for error message
  const [loginMessgae, setloginMessage] = useState("");// New state for login message
  const navigate = useNavigate();

  

const handleClick = async (e) => {
  e.preventDefault();
  setUserErrorMessage("");
  setPassErrorMessage("");
  setloginMessage("");

  if (username.trim() === "") {
    setUserErrorMessage("Username is required");
    return;
  }

  if (password.trim() === "") {
    setPassErrorMessage("Password is required");
    return;
  }

  const loginCredentials = {
    username: username,
    password: password,
  };

  console.log(loginCredentials);

  try {
    const response = await axios.post("http://localhost:8081/User/login", loginCredentials, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const userData = response.data;

      console.log("Login status:", userData.status);

      if (userData.status === "success") {
        const userAttributes = {
          role: "registered user",
          id: userData.id,
          username: userData.username,
          password: userData.password,
          email: userData.email,
          street: userData.street,
          city: userData.city,
          state: userData.state,
          zip: userData.zip
        }

        console.log(userAttributes);
        updateUserAttributes(userAttributes);
        navigate("/");
        return;
      } else {
        setloginMessage("Invalid Login, please check your username and password then try again.");
        return;
      }
    } else {
      console.log("Login failed");
      // Handle login failure, show error message, etc.
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

  return (
    <>
      <section class="bg-gray-50">
        <div class="flex flex-col items-center mt-16 px-6 py-8 mx-auto lg:py-0">
          <a
            href="#"
            class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img class="w-8 h-8 mr-2" src={logo} alt="logo" />
          </a>
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white animate__bounceIn">
                Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                {/* Display error message */}
                {loginMessgae && (
                  <p className="text-red-500">{loginMessgae}</p>
                )}
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required="true"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                {/* Display error message */}
                {userErrorMessage && (
                  <p className="text-red-500">{userErrorMessage}</p>
                )}
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required="true"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* Display error message */}
                {passErrorMessage && (
                  <p className="text-red-500">{passErrorMessage}</p>
                )}
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""

                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="remember"
                        class="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    class="text-sm font-medium text-primary-600 hover:underline dark:text-gray-300"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleClick}
                >
                  Sign in

                </button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-300">
                  Don’t have an account yet?{" "}
                  <Link to="/signup">
                    <a
                      href="#"
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
