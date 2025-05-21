package com.footalentgroup.exceptions;

public class FanProfileNotFoundException extends RuntimeException {
    public FanProfileNotFoundException(String message) {
        super(message);
    }
}
