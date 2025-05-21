package com.footalentgroup.models.dtos.request;

import com.footalentgroup.models.enums.EventType;
import com.footalentgroup.validators.ImageFile;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;

@Data
@Builder
@AllArgsConstructor
public class EventRequestDto {

    @Schema(description = "Nombre del evento", required = true)
    @NotBlank(message = "El nombre del evento no puede estar vacío.")
    private String name;

    @Schema(description = "Categoría del evento", required = true)
    @NotBlank(message = "La categoría del evento no puede estar vacía.")
    private String category;

    @Schema(description = "Tipo de evento", examples = {"Single", "Recurring"}, required = true)
    @NotNull(message = "El tipo de evento es obligatorio.")
    private EventType type;

    @Schema(description = "Fecha del evento", example = "dd/MM/yyyy", required = true)
    @NotBlank(message = "La fecha del evento es obligatoria.")
    private String dateString;  // Stores the raw date string from the request

    @Schema(hidden = true)
    private LocalDate date;     // Stores the parsed and validated LocalDate object

    @Schema(description = "Hora de inicio del evento", example = "HH:mm", required = true)
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    @NotNull(message = "La hora de inicio es obligatoria.")
    private LocalTime startTime;

    @Schema(description = "Hora de finalización del evento", example = "HH:mm", required = true)
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    @NotNull(message = "La hora de finalización es obligatoria.")
    private LocalTime endTime;

    @Schema(description = "Ubicación del evento", required = true)
    @NotBlank(message = "La ubicación del evento no puede estar vacía.")
    private String location;

    @Schema(description = "Descripción del evento", required = true)
    @NotBlank(message = "La descripción del evento no puede estar vacía.")
    private String description;

    @Schema(description = "Imagen del evento", required = false)
    @ImageFile
    private MultipartFile image;

    @Schema(description = "Indica si la imagen debe eliminarse", required = false)
    private Boolean deleteImage;

    @Schema(description = "Lista de entradas para el evento", required = false)
    @Valid
    private List<TicketRequestDto> tickets;

    @Schema(description = "Indica si el evento está activo", required = false)
    private Boolean active;

    @Schema(description = "ID del músico organizador del evento", required = true)
    @NotNull(message = "El ID del músico es obligatorio.")
    private Long musicianId;

    public void doDefault() {
        if (dateString != null && !dateString.isEmpty()) {
            date = LocalDate.parse(dateString, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        }

        if (Objects.isNull(deleteImage)) {
            deleteImage = false;
        }

        if (!Objects.isNull(tickets) && !tickets.isEmpty()) {
            tickets.forEach(TicketRequestDto::doDefault);
        }

        if (Objects.isNull(active)) {
            active = true;
        }
    }
}
