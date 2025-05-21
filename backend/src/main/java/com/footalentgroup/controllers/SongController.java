package com.footalentgroup.controllers;

import com.footalentgroup.models.dtos.request.SongPageRequestDto;
import com.footalentgroup.models.dtos.request.SongUploadRequestDto;
import com.footalentgroup.models.dtos.response.ApiResponse;
import com.footalentgroup.services.SongService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(SongController.SONGS)
@RequiredArgsConstructor
@Tag(name = "Canciones")
public class SongController {
    public static final String SONGS = "/songs";

    private final SongService songService;

    @Operation(summary = "Sube una nueva canción (requiere autenticación)", security = @SecurityRequirement(name = "bearer-key"))
    @PostMapping(consumes = "multipart/form-data")
    @PreAuthorize("hasRole('MUSICIAN')")
    public ResponseEntity<?> uploadSong(@ModelAttribute @Valid SongUploadRequestDto request) {
        songService.uploadSong(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Canción subida con exito"));
    }

    @Operation(summary = "Obtiene una canción por su ID")
    @GetMapping("/{id}")
    public ResponseEntity<?> getSongById(@PathVariable Long id) {
        return ResponseEntity.ok().body(songService.getSongById(id));
    }

    @Operation(summary = "Obtiene todas las canciones")
    @GetMapping
    public ResponseEntity<?> getAllSongs(@Valid @ParameterObject SongPageRequestDto request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), request.getSort());
        return ResponseEntity.ok().body(songService.getAllSongs(pageable));
    }

    @Operation(summary = "Obtiene todas las canciones de un artista por su ID")
    @GetMapping("musician/{id}")
    public ResponseEntity<?> getAllSongsByMusicianId(@PathVariable Long id,@ParameterObject @Valid SongPageRequestDto request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), request.getSort());
        return ResponseEntity.ok().body(songService.getAllSongsByMusicianId(id,pageable));
    }

    @Operation(summary = "Obtiene una lista paginada de canciones cuyo título o género contenga el término de búsqueda especificado.")
    @GetMapping("/search")
    public ResponseEntity<?> searchSongs(@RequestParam(value = "search", required = false) String search, @ParameterObject @Valid SongPageRequestDto request) {
        Pageable pageable = PageRequest.of(request.getPage(), request.getSize(), request.getSort());
        return ResponseEntity.ok().body(songService.searchSongs(search,pageable));
    }

    @Operation(summary = "Actualiza una canción por ID (requiere autenticación, solo el autor puede editar)", security = @SecurityRequirement(name = "bearer-key"))
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    @PreAuthorize("hasRole('MUSICIAN')")
    public ResponseEntity<?> updateSong(@PathVariable Long id, @ModelAttribute @Valid SongUploadRequestDto request) {
        songService.updateSong(id,request);
        return ResponseEntity.ok().body(new ApiResponse<>("Los datos de la canción se han atualizado"));
    }
}
