package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.NotFoundException;
import com.footalentgroup.models.dtos.mapper.SongMapper;
import com.footalentgroup.models.dtos.request.SongUploadRequestDto;
import com.footalentgroup.models.dtos.response.PageResponseDto;
import com.footalentgroup.models.dtos.response.SongResponseDto;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import com.footalentgroup.models.entities.SongEntity;
import com.footalentgroup.models.enums.SongSourceType;
import com.footalentgroup.repositories.MusicianProfileRepository;
import com.footalentgroup.repositories.SongRepository;
import com.footalentgroup.services.AuthenticatedUserService;
import com.footalentgroup.services.CloudinaryService;
import com.footalentgroup.services.SongService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class SongServiceImpl implements SongService {

    private final SongRepository songRepository;
    private final SongMapper mapper;
    private final AuthenticatedUserService authenticatedUserService;
    private final MusicianProfileRepository musicianRepository;
    private final CloudinaryService cloudinaryService;


    @Override
    public SongResponseDto uploadSong(SongUploadRequestDto requestDto) {
        validateSongRequest(requestDto);

        String email = authenticatedUserService.getAuthenticatedUsername();
        MusicianProfileEntity musician = musicianRepository.findByUserEmail(email).orElseThrow();
        SongEntity song = mapper.toEntity(requestDto);

        song.setMusicianProfile(musician);

        switch (requestDto.sourceType()) {
            case SPOTIFY -> song.setSpotifyUrl(requestDto.spotifyUrl());
            case FILE -> {
                Map<String, Object> uploadResult = cloudinaryService.uploadAudio(requestDto.audio());
                song.setAudioUrl((String) uploadResult.get("secure_url"));
                song.setAudioPublicId((String) uploadResult.get("public_id"));
            }
        }

        songRepository.save(song);
        return null;
    }

    @Override
    public SongResponseDto getSongById(Long id) {
        SongEntity song = songRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Canción no encontrada: " + id));

        return mapper.toSongResponseDto(song);
    }

    @Override
    public PageResponseDto<SongResponseDto> getAllSongs(Pageable pageable) {
        Page<SongEntity> songPage = songRepository.findAll(pageable);
        return mapper.toPageResponse(songPage);
    }

    @Override
    public SongResponseDto updateSong(Long idSong, SongUploadRequestDto requestDto) {
        validateSongRequest(requestDto);
        String email = authenticatedUserService.getAuthenticatedUsername();
        SongEntity song = songRepository.findByIdAndMusicianProfile_User_Email(idSong, email)
                .orElseThrow(() -> new RuntimeException("La canción no pertenece al perfil del músico autenticado o no existe"));

        mapper.updateEntity(requestDto, song);

        switch (requestDto.sourceType()) {
            case FILE -> {
                if (requestDto.audio() != null && !requestDto.audio().isEmpty()) {
                    if (song.getAudioPublicId() != null) {
                        cloudinaryService.deleteAudio(song.getAudioPublicId());
                    }
                    Map<String, Object> uploadResult = cloudinaryService.uploadAudio(requestDto.audio());
                    song.setAudioUrl((String) uploadResult.get("secure_url"));
                    song.setAudioPublicId((String) uploadResult.get("public_id"));
                }
                song.setSpotifyUrl(null);
            }

            case SPOTIFY -> {
                song.setSpotifyUrl(requestDto.spotifyUrl());
                if (song.getAudioPublicId() != null) {
                    cloudinaryService.deleteAudio(song.getAudioPublicId());
                }
                song.setAudioUrl(null);
                song.setAudioPublicId(null);
            }
        }

        songRepository.save(song);
        return null;
    }

    @Override
    public PageResponseDto<SongResponseDto> getAllSongsByMusicianId(Long idMusician, Pageable pageable) {
        Page<SongEntity> songPage = songRepository.findByMusicianProfileId(idMusician,pageable);
        return mapper.toPageResponse(songPage);
    }

    @Override
    public PageResponseDto<SongResponseDto> searchSongs(String search, Pageable pageable) {
        Page<SongEntity> songPage =
                StringUtils.isBlank(search)
                        ? songRepository.findAll(pageable)
                        : songRepository.findByTitleContainingIgnoreCaseOrGenreContainingIgnoreCase(search, search, pageable);

        return mapper.toPageResponse(songPage);
    }

    @Override
    public void deleteSong(Long id) {
        //delete logico o no?
    }

    private void validateSongRequest(SongUploadRequestDto dto) {
        switch (dto.sourceType()) {
            case SPOTIFY -> {
                if (dto.spotifyUrl() == null || dto.spotifyUrl().isBlank()) {
                    throw new IllegalArgumentException("Debe proporcionar una URL válida de Spotify.");
                }
            }
            case FILE -> {
                if (dto.audio() == null || dto.audio().isEmpty()) {
                    throw new IllegalArgumentException("Debe adjuntar un archivo de audio.");
                }
            }
            default -> throw new IllegalArgumentException("Tipo de fuente no válido.");
        }
    }
}
