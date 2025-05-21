package com.footalentgroup.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(ApiController.API)
@Tag(name = "Documentación")
public class ApiController {
    public static final String API = "/docs";

    @Operation(summary = "Información de la API")
    @GetMapping
    public ResponseEntity<?> read() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of(
                        "name", "Ecos",
                        "version", "1.0.0",
                        "description", "Foo Talent Group. Equipo 22 Noche"
                ));
    }
}
