package com.footalentgroup.exceptions;

public class MusicianProfileNotFoundException extends RuntimeException {
    public MusicianProfileNotFoundException(String message) {
        super(message);
    }
}

