package com.footalentgroup.models.dtos.request;

import com.footalentgroup.models.enums.SongSourceType;
import com.footalentgroup.validators.MusicFile;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

public record SongUploadRequestDto(
        @NotBlank(message = "El título es obligatorio.")
        @Schema(description = "Título de la canción", example = "Mi Canción Favorita", required = true)
        String title,

        @Schema(description = "Género musical", example = "Reggaetón",required = true)
        @NotBlank(message = "El género es obligatorio.")
        String genre,

        @NotNull(message = "Debe indicar el tipo de fuente de la canción.")
        @Schema(description = "Origen del contenido de la canción: FILE, SPOTIFY", example = "FILE")
        SongSourceType sourceType,

        @MusicFile(message = "El archivo de música debe ser válido (mp3, wav, flac, etc.).")
        @Schema(description = "Archivo de audio en formato mp3, wav, etc.")
        MultipartFile audio,

        @Schema(description = "Enlace opcional a Spotify", example = "https://open.spotify.com/track/3D24ErT1MMmUfXWotSj2A2", required = false)
        @Pattern(regexp = "^https://open\\.spotify\\.com(/[^/]+)?/track/[a-zA-Z0-9]{22}([?&].*)?$", message = "El enlace de Spotify debe ser válido y apuntar a una canción individual (no álbum, artista o playlist).")
        String spotifyUrl,

        @Schema(description = "Enlace opcional a YouTube", example = "https://www.youtube.com/watch?v=xyz456")
        @Pattern(regexp = "^(https?://(www\\.)?youtube\\.com/.*)?$", message = "El enlace de YouTube no es válido.")
        String youtubeUrl

) {
}
