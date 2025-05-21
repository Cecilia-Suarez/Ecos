package com.footalentgroup.models.dtos.response;

public record ApiResponse<T>(boolean isSuccess, String message, T data) {

    // Constructor con datos y mensaje predeterminado
    public ApiResponse(T data) {
        this(true, "Operation successful", data);
    }

    // Constructor con mensaje y datos
    public ApiResponse(String message, T data) {this(true, message, data);}

    // Constructor con solo mensaje (sin datos)
    public ApiResponse(String message) {
        this(true, message, null);
    }

    // Constructor sin mensaje ni datos (respuesta genérica exitosa)
    public ApiResponse() {
        this(true, "Operation successful", null);
    }
}