package com.footalentgroup.controllers;

import com.footalentgroup.models.dtos.request.BannerUploadReqestDto;
import com.footalentgroup.models.dtos.request.ContactRequestDto;
import com.footalentgroup.models.dtos.request.MusicianProfileRequestDto;
import com.footalentgroup.models.dtos.response.ApiResponse;
import com.footalentgroup.models.dtos.response.BannerResponseDto;
import com.footalentgroup.models.dtos.response.MusicianSimpleResponseDto;
import com.footalentgroup.models.dtos.response.PageResponseDto;
import com.footalentgroup.services.EmailService;
import com.footalentgroup.services.MusicianProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(MusicianProfileController.MUSICIANS)
@RequiredArgsConstructor
@Tag(name = "Perfil de Músico")
public class MusicianProfileController {
    public static final String MUSICIANS = "/musician-profile";
    public static final String ID_ID = "/{id}";
    public static final String SEARCH = "/search";
    public static final String BANNER = "/banner";
    public static final String DONATION = "/donations";
    public static final String CONTACT = "/contact";

    private final MusicianProfileService musicService;
    private final EmailService emailService;

    @Operation(summary = "Obtiene el perfil del músico especificado por ID")
    @GetMapping(ID_ID)
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseEntity
                .ok()
                .body(new ApiResponse<>(this.musicService.getProfileById(id)));
    }

    @Operation(summary = "Obtiene el banner del perfil de un músico por su ID")
    @GetMapping(ID_ID + BANNER)
    public ResponseEntity<BannerResponseDto> getBanner(@PathVariable Long id) {
        return ResponseEntity.ok(this.musicService.getBannerByMusicianId(id));
    }

    @Operation(summary = "Buscar artistas destacados")
    @GetMapping(SEARCH)
    public ResponseEntity<PageResponseDto<MusicianSimpleResponseDto>> search(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "4") int size,
            @RequestParam(defaultValue = "") String search
    ) {
        return ResponseEntity
                .ok()
                .body(this.musicService.search(page, size, search));
    }

    @Operation(summary = "Obtiene la información de donaciones del músico por su ID", security = @SecurityRequirement(name = "bearer-key"))
    @GetMapping(ID_ID + DONATION)
    @PreAuthorize("hasAnyRole('FAN', 'MUSICIAN')")
    public ResponseEntity<?> getDonationInfo(@PathVariable Long id) {
        return ResponseEntity
                .ok()
                .body(this.musicService.getDonationInfo(id));
    }

    @Operation(summary = "Actualiza perfil del músico, solo usuario autenticado", security = @SecurityRequirement(name = "bearer-key"))
    @PutMapping(consumes = "multipart/form-data")
    @PreAuthorize("hasRole('MUSICIAN')")
    public ResponseEntity<?> update(@ModelAttribute @Valid MusicianProfileRequestDto requestDto){
        this.musicService.updateProfile(requestDto);
        return ResponseEntity
                .ok()
                .body(new ApiResponse<>("Perfil de musico Actualizado"));
    }

    @Operation(summary = "Actualiza el banner del perfil del músico autenticado", security = @SecurityRequirement(name = "bearer-key"))
    @PutMapping(value = BANNER, consumes = "multipart/form-data")
    @PreAuthorize("hasRole('MUSICIAN')")
    public ResponseEntity<?> updateBanner(@ModelAttribute @Valid BannerUploadReqestDto request) {
        this.musicService.updateBanner(request);
        return ResponseEntity.ok().body(new ApiResponse<>("Banner actualizado con exito"));
    }

    @Operation(summary = "Permite contactar a un músico mediante email", security = @SecurityRequirement(name = "bearer-key"))
    @PostMapping(CONTACT)
    @PreAuthorize("hasAnyRole('FAN', 'MUSICIAN')")
    public ResponseEntity<?> contact(@Valid @RequestBody ContactRequestDto contactDto) {
        this.emailService.sendEmail(contactDto);
        return ResponseEntity
                .ok()
                .body(new ApiResponse<>("Correo enviado correctamente"));
    }
}
