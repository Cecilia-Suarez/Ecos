package com.footalentgroup.models.dtos.request;

import com.footalentgroup.validators.ImageFile;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public record FanProfileRequestDto (
        @ImageFile
        @Schema(description = "Archivo de imagen (jpg, jpeg, png, webp)")
        MultipartFile photo,

        @Schema(description = "Indica si se debe eliminar la foto actual", example = "false")
        boolean deletePhoto,

        @Schema(description = "País de origen", example = "Argentina", required = true)
        @NotBlank(message = "El pais no debe estar vacío")
        String country,

        @Schema(description = "Géneros musicales", required = true)
        @Size(min = 1, message = "Debe seleccionar al menos un género de interés")
        List<@NotBlank(message = "El género no puede estar vacío") String> genreInterest
        )
{
}
