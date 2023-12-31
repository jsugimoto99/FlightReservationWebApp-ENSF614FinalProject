package com.group12.CloudNineBackend.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.group12.CloudNineBackend.boundary.AircraftRepo;
import com.group12.CloudNineBackend.boundary.CrewRepo;
import com.group12.CloudNineBackend.boundary.FlightRepo;
import com.group12.CloudNineBackend.domain.Flight;
import com.group12.CloudNineBackend.domain.Aircraft;
import com.group12.CloudNineBackend.domain.Crew;

/**
 * 
 * Controller class for handling HTTP requests related to flights.
 *
 * @author Jeremy Sugimoto
 */

@RestController
@RequestMapping("/flight")
@CrossOrigin
public class FlightController {

    @Autowired
    private FlightRepo flightRepo;
    
    @Autowired
    private AircraftRepo aircraftRepo;
    
    @Autowired 
    private CrewRepo crewRepo;

    /**
     * Handles HTTP POST requests to create a new flight.
     *
     * @param flight The flight object to be added. Sent as a request body.
     * @return A string indicating that the flight has been created.
     */
    @PostMapping("/add")
    public HttpStatus add(@RequestBody Flight flight, @RequestParam("crewId") Long crewId,@RequestParam("aircraftId") Long id) {
        // Retrieve or create the Aircraft based on the provided aircraftId
        Optional<Aircraft> optionalAircraft = aircraftRepo.findById(id);
        Optional<Crew> optionalCrew = crewRepo.findById(crewId);
        if (optionalAircraft.isPresent()) {
            // Set the aircraft in the flight
            Aircraft aircraft = optionalAircraft.get();
            flight.setAircraft(aircraft);
            aircraft.setFlight(flight);
        }
        if(optionalCrew.isPresent()) {
        	Crew crew = optionalCrew.get();
        	flight.setCrew(crew);
        	crew.setFlight(flight);

            // Save the flight
            flightRepo.save(flight);

            return HttpStatus.OK;
        } else {
            // Handle the case when the aircraft is not found
            return HttpStatus.NOT_FOUND;
        }
    }

        
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteFlight(@PathVariable("id") Long id) {
        try {
        	Aircraft aircraft = aircraftRepo.getByFlightId(id);
        	Crew crew = crewRepo.getByFlightId(id);
        	aircraft.removeFlight();
        	crew.removeFlight();
            flightRepo.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Handles HTTP GET requests to retrieve a list of all flights.
     *
     * @return A list of Flight objects representing all flights.
     */
    @GetMapping("/listAll")
    public ResponseEntity<List<Map<String, Object>>> getAllFlights() {
        try {
            List<Flight> flights = flightRepo.findAll();
            List<Map<String, Object>> responseList = new ArrayList<>();

            for (Flight flight : flights) {
                Map<String, Object> flightMap = new HashMap<>();
                flightMap.put("id", flight.getId());
                flightMap.put("depart_loc", flight.getDepartLoc());
                flightMap.put("dest_loc", flight.getDestLoc());
                flightMap.put("depart_date", flight.getDate());

                responseList.add(flightMap);
            }

            return new ResponseEntity<>(responseList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/listFlights/{date}/{departLoc}/{destLoc}")
    public ResponseEntity<List<Map<String, Object>>> getFlightsByDayAndLocations(
        @PathVariable String departLoc,
        @PathVariable String destLoc,
        @PathVariable Date date
    ) {
        try {
            List<Flight> flights = flightRepo.findByDateAndDepartLocAndDestLoc(date, departLoc, destLoc);
            List<Map<String, Object>> responseList = new ArrayList<>();

            for (Flight flight : flights) {
                Map<String, Object> flightMap = new HashMap<>();
                flightMap.put("id", flight.getId());
                flightMap.put("departLoc", flight.getDepartLoc());
                flightMap.put("destLoc", flight.getDestLoc());
                flightMap.put("date", flight.getDate());
                flightMap.put("departTime",flight.getDepartTime());
                flightMap.put("arriveTime", flight.getArriveTime());

                responseList.add(flightMap);
            }
            
//            return ResponseEntity.ok(responseList);

            return new ResponseEntity<>(responseList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/getFlightById/{flightId}")
    public ResponseEntity<Map<String, Object>> getFlightById(@PathVariable Long flightId) {
        try {
            Optional<Flight> optionalFlight = flightRepo.findById(flightId);

            if (optionalFlight.isPresent()) {
                Flight flight = optionalFlight.get();
                Map<String, Object> flightMap = new HashMap<>();
                flightMap.put("id", flight.getId());
                flightMap.put("departLoc", flight.getDepartLoc());
                flightMap.put("destLoc", flight.getDestLoc());
                flightMap.put("date", flight.getDate());
                flightMap.put("departTime", flight.getDepartTime());
                flightMap.put("arriveTime", flight.getArriveTime());
                flightMap.put("aircraftId",flight.getAircraftId());

                return new ResponseEntity<>(flightMap, HttpStatus.OK);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    
    @GetMapping("/{flightId}/aircraftId")
    public ResponseEntity<Long> getAircraftIdByFlightId(@PathVariable Long flightId) {
        Optional<Flight> optionalFlight = flightRepo.findById(flightId);

        if (optionalFlight.isPresent()) {
            Flight flight = optionalFlight.get();
            Long aircraftId = flight.getAircraftId(); // Assuming there's a method like getAircraftId() in your Flight class

            return ResponseEntity.ok(aircraftId);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}