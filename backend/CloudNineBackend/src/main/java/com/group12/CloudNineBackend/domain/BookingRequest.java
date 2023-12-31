package com.group12.CloudNineBackend.domain;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BookingRequest {
    @JsonProperty("seat_id")
	private String seatId;
    
    @JsonProperty("flight_id")
    private long flightId;
    
    @JsonProperty("to_email")
    private String toEmail;
    
    @JsonProperty("first_name")
    private String firstName;
    
    @JsonProperty("last_name")
    private String lastName;
    
    @JsonProperty("insurance")
    private Boolean insurance;
    
    @JsonProperty("transaction_id")
    private Long transactionId;

    // Getters and setters
    
    public Long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}

	public BookingRequest() {
    	
    }
    
    public Boolean getInsurance() {
    	return insurance;
    }
    
    public void setInsurance(Boolean insurance) {
    	this.insurance = insurance;
    }
    
    public String getSeatId() {
    	return seatId;
    }
    
    public long getFlightId() {
    	return flightId;
    }
    
    public String gettoEmail() {
    	return toEmail;
    }
    
    public String getFirstName() {
    	return firstName;
    }
    
    public String getLastName() {
    	return lastName;
    }
    
    public void setSeatId(String seatId) {
        this.seatId = seatId;
    }

    public void setFlightId(long flightId) {
        this.flightId = flightId;
    }

    public void setToEmail(String toEmail) {
        this.toEmail = toEmail;
    }
    
    public void setFirstName(String fName) {
    	this.firstName = fName;
    }
    
    public void setLastname(String lName) {
    	this.lastName = lName;
    }
    
    @Override
    public String toString() {
        return "BookingRequest{" +
                "seat_id=" + seatId +
                ", flight_id=" + flightId +
                ", to_email='" + toEmail + '\'' +
                ", first_name=" + firstName + 
                ", last_name=" + lastName +
                ", insurance=" + insurance +
                '}';
    }

}
