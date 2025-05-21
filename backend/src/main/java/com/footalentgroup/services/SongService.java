package com.footalentgroup.services;

import com.footalentgroup.models.dtos.request.SongUploadRequestDto;
import com.footalentgroup.models.dtos.response.PageResponseDto;
import com.footalentgroup.models.dtos.response.SongResponseDto;
import org.springframework.data.domain.Pageable;

public interface SongService {

    SongResponseDto uploadSong(SongUploadRequestDto request);

    SongResponseDto getSongById(Long id);

    PageResponseDto<SongResponseDto> getAllSongs(Pageable pageable);

    SongResponseDto updateSong(Long idSong, SongUploadRequestDto request);

    PageResponseDto<SongResponseDto> getAllSongsByMusicianId(Long idMusician, Pageable pageable);

    PageResponseDto<SongResponseDto> searchSongs(String search, Pageable pageable);

    void deleteSong(Long id);



}
