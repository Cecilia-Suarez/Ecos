package com.footalentgroup.models.dtos.request;

import com.footalentgroup.validators.ImageFile;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.springframework.web.multipart.MultipartFile;

public record MusicianProfileRequestDto(

        @Schema(description = "Nombre artístico del artista o banda", example = "Los Rockeros", required = true)
        @NotBlank(message = "El nombre de artista/banda no puede estar vacío")
        String stageName,

        @Schema(description = "Archivo de imagen (jpg, jpeg, png, webp)")
        @ImageFile
        MultipartFile photo,

        @Schema(description = "Indica si se debe eliminar la foto actual", example = "false")
        boolean deletePhoto,

        @Schema(description = "Género musical principal", example = "Rock", required = true)
        @NotBlank(message = "El genero no debe estar vacio")
        String genre,

        @Schema(description = "País de origen", example = "Argentina", required = true)
        @NotBlank(message = "El paíz no debe estar vacio")
        String country,

        @Schema(description = "Descripción de artista/banda", required = true)
        @NotBlank(message = "La descripción no debe estar vacia")
        String description,

        @Schema(description = "Número de WhatsApp de contacto", example = "+50660000000")
        String whatsapp,

        @Schema(description = "Enlace de pago rápido para recibir donaciones")
        String paymentLink,

        @Schema(description = "Alias como identificador en el sistema bancario")
        String paymentAlias,

        @Schema(description = "Clave Bancaria Uniforme (CBU) para recibir transferencias")
        String cbu,

        @Schema(description = "URL del perfil de Spotify", example = "https://open.spotify.com/artist/abc123")
        @Pattern(regexp = "^(https?://)?(www\\.)?spotify\\.com/.*$", message = "Debe ser una URL válida de Spotify")
        String spotifyUrl,

        @Schema(description = "URL del canal de YouTube", example = "https://www.youtube.com/channel/xyz456")
        @Pattern(regexp = "^(https?://)?(www\\.)?youtube\\.com/.*$", message = "Debe ser una URL válida de YouTube")
        String youtubeUrl,

        @Schema(description = "URL del perfil de Instagram", example = "https://www.instagram.com/mi_artista")
        @Pattern(regexp = "^(https?://)?(www\\.)?instagram\\.com/.*$", message = "Debe ser una URL válida de Instagram")
        String instagramUrl,

        @Schema(description = "URL del perfil de TikTok", example = "https://www.tiktok.com/@mi_artista")
        @Pattern(regexp = "^(https?://)?(www\\.)?tiktok\\.com/.*$", message = "Debe ser una URL válida de TikTok")
        String tiktokUrl
) {
}
