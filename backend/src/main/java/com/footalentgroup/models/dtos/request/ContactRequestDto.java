package com.footalentgroup.models.dtos.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ContactRequestDto {

    @NotBlank(message = "El asunto no puede estar vacío.")
    @Schema(description = "Asunto del mensaje", required = true)
    private String subject;

    @NotBlank(message = "El mensaje no puede estar vacío.")
    @Schema(description = "Contenido del mensaje enviado por el fan", required = true)
    private String message;

    @NotBlank(message = "El email del remitente es obligatorio.")
    @Email(message = "El email no tiene un formato válido.")
    @Schema(description = "Email del usuario que envía el mensaje", required = true)
    private String senderEmail;

    @NotNull(message = "El ID del destinatario es obligatorio.")
    @Schema(description = "ID del músico que recibirá el mensaje", required = true)
    private Long musicianId;
}
