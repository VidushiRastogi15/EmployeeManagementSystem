package com.company.ems.exception;

import java.util.Date;

import lombok.Data;

@Data
public class ErrorDetails {
    private Date timestamp;
    private String message;
    private String details;

    public ErrorDetails(String message, String details) {
        super();
        this.timestamp = new Date();
        this.message = message;
        this.details = details;
    }

}
