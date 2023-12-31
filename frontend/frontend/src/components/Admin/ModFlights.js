import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ModFlights() {
  const [departLoc, setDeparture] = useState("");
  const [destLoc, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [departTime, setDepartureTime] = useState("12:00");
  const [arriveTime, setArrivalTime] = useState("12:00");
  const [aircraftId, setAircraftId] = useState("");
  const [flights, setFlights] = useState([]);
  const [locations, setLocations] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  const [crews, setCrews] = useState([]);
  const [crewId, setCrewId] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8081/flight/listAll")
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.error("Error fetching flights:", error);
      });
  }, []);

  const handleDelete = (flightId) => {
    axios
      .delete(`http://localhost:8081/flight/delete/${flightId}`)
      .then((response) => {
        console.log(response);
        // Update the flights state after deleting a flight
        setFlights(flights.filter((flight) => flight.id !== flightId));
      })
      .catch((error) => {
        console.error("Error deleting flight:", error);
      });
  };

  // To Implement!!!!!!!!!!!!!!!!!!!
  useEffect(() => {
    // Make a GET request to fetch locations
    axios
      .get("http://localhost:8081/location/listAll")
      .then((response) => {
        // Assuming the response data is an array of locations
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  useEffect(() => {
    // Make a GET request to fetch locations
    axios
      .get("http://localhost:8081/crew/listAllAvailable")
      .then((response) => {
        // Assuming the response data is an array of locations
        setCrews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching crew:", error);
      });
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  useEffect(() => {
    // Make a GET request to fetch locations
    axios
      .get("http://localhost:8081/aircraft/listAllAvailable")
      .then((response) => {
        // Assuming the response data is an array of locations
        setAircrafts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching aircrafts:", error);
      });
  }, []); 

  const handleClick = (e) => {
    e.preventDefault();

    const localDate = new Date(date + "T00:10:00");

    const flight = {
      arriveTime: `${arriveTime}:00`,
      date: localDate.toISOString().slice(0, 10),
      departLoc: departLoc,
      departTime: `${departTime}:00`,
      destLoc: destLoc,
    };

    console.log(flight);
    console.log(JSON.flight);
    const id = aircraftId;

    axios.post("http://localhost:8081/flight/add", flight, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          aircraftId: id,
          crewId: crewId
        },
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const services = [
    { title: "Quality", icon: "...icon path..." },
    { title: "Communication", icon: "...icon path..." },
    { title: "Efficiency", icon: "...icon path..." },
    { title: "Accessibility", icon: "...icon path..." },
    { title: "Service Name", icon: "...icon path..." },
    { title: "Safty", icon: "...icon path..." },
  ];
  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-10 mx-auto">
          <div>
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-20">
              Manage Flights
            </h1>
          </div>
          <div class="container mx-auto lg:w-3/4 md:w-4/5 sm:w-full px-5">
            <h1 class="title-font font-medium text-3xl text-gray-900">
              Add Flight To The System
            </h1>
          </div>
          <div class="container mx-auto lg:w-3/4 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full">
            <h2 class="text-gray-900 text-lg font-medium title-font mb-5">
              Add Flight
            </h2>
            <div class="relative mb-4">
              <label for="depart_loc" class="leading-7 text-sm text-gray-600">
                From
              </label>

              <select
                id="depart_loc"
                name="depart_loc"
                value={departLoc}
                onChange={(e) => setDeparture(e.target.value)}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                {/* Add default option */}
                <option value="" disabled selected>
                  Select a location
                </option>
                {/* Populate options from the locations state */}
                {locations.map((location) => (
                  <option key={location.code} value={location.city}>
                    {location.city}
                  </option>
                ))}
              </select>
            </div>
            <div class="relative mb-4">
              <label for="depart_loc" class="leading-7 text-sm text-gray-600">
                To
              </label>

              <select
                id="dest_loc"
                name="dest_loc"
                value={destLoc}
                onChange={(e) => setDestination(e.target.value)}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                {/* Add default option */}
                <option value="" disabled selected>
                  Select a location
                </option>
                {/* Populate options from the locations state */}
                {locations.map((location) => (
                  <option key={location.code} value={location.city}>
                    {location.city}
                  </option>
                ))}
              </select>
            </div>
            <div class="relative mb-4">
              <label for="Date" class="leading-7 text-sm text-gray-600">
                Date
              </label>
              <input
                type="date"
                id="depart_date"
                name="depart_date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label
                for="Departure Time"
                class="leading-7 text-sm text-gray-600"
              >
                Departure Time
              </label>
              <input
                type="time"
                id="depTime"
                name="depTime"
                value={departTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="Arrival Time" class="leading-7 text-sm text-gray-600">
                Arrival Time
              </label>
              <input
                type="time"
                id="arrTime"
                name="arrTime"
                value={arriveTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative mb-4">
              <label for="depart_loc" class="leading-7 text-sm text-gray-600">
                Select Aircraft
              </label>

              <select
                id="aircraft"
                name="aircraft"
                value={aircraftId}
                onChange={(e) => setAircraftId(e.target.value)}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                {/* Add default option */}
                <option value="" disabled selected>
                  Select an aircraft
                </option>
                {/* Populate options from the locations state */}
                {aircrafts.map((aircraft) => (
                  <option key={aircraft.aircraftId} value={aircraft.aircraftId}>
                    ID: {aircraft.aircraftId}, Model: {aircraft.model}
                  </option>
                ))}
              </select>
            </div>
            <div class="relative mb-4">
              <label for="depart_loc" class="leading-7 text-sm text-gray-600">
                Select Crew
              </label>
              <select
                id="crew"
                name="crew"
                value={crewId}
                onChange={(e) => setCrewId(e.target.value)}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              >
                {/* Add default option */}
                <option value="" disabled selected>
                  Select a Crew
                </option>
                {/* Populate options from the locations state */}
                {crews.map((crew) => (
                  <option key={crew.id} value= {crew.id}>
                    ID: {crew.id}
                  </option>
                ))}
              </select>
            </div>
            <button
              class="text-white bg-gray-500 border-0 py-2 px-20 focus:outline-none hover:bg-gray-600 rounded text-lg"
              onClick={handleClick}
            >
              Add Flight
            </button>
          </div>
          <div>
            <div class="text-gray-600 body-font">
              <div class="container px-5 p-10 pb-5 mx-auto">
                <ul class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
                    <h1 class="text-gray-900 text-xl font-medium title-font mb-5 mx-auto">
                  Flight List
                </h1>
                {flights.map((flight) => (
                    <li key={flight.id} class="mb-3 text-xl text-black-500">
                      From: {flight.depart_loc}, To: {flight.dest_loc} -{" "}
                      Date: {flight.depart_date}
                      <button
                        onClick={() => handleDelete(flight.id)}
                        class="ml-3 text-white bg-red-500 border-0 py-1 px-2 focus:outline-none hover:bg-red-600 rounded text-sm"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
  </div>
        </div>
      </section>
    </>
  );
}
