package com.footalentgroup.models.dtos.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import org.springdoc.core.annotations.ParameterObject;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.data.domain.Sort;

@Getter
@Setter
@ParameterObject
public class SongPageRequestDto {

    @Min(value = 0, message = "El número de página no puede ser negativo")
    @Parameter(description = "Número de página (empezando en 0)", example = "0")
    private int page = 0;

    @Min(value = 1, message = "El tamaño de página debe ser al menos 1")
    @Max(value = 100, message = "El tamaño de página no debe exceder 100")
    @Parameter(description = "Tamaño de página", example = "10")
    private int size = 10;

    @Pattern(regexp = "title|genre", message = "El campo de ordenamiento no es válido")
    @Parameter(description = "Campo por el que ordenar", example = "title")
    private String sortBy = "title";

    @Pattern(regexp = "asc|desc", flags = Pattern.Flag.CASE_INSENSITIVE,
            message = "La dirección debe ser 'asc' o 'desc'")
    @Parameter(description = "Dirección de ordenamiento (asc o desc)", example = "asc")
    private String direction = "asc";

    public Sort getSort() {
        return direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();
    }
}