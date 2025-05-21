package com.footalentgroup.services;

import com.footalentgroup.models.dtos.response.PageResponseDto;
import com.footalentgroup.models.dtos.response.SongResponseDto;
import org.springframework.data.domain.Pageable;


public interface SavedSongService {
    void saveSongAsFavourite (Long song_id);

    void deleteSongFromFavourites (Long song_id);

    PageResponseDto<SongResponseDto> getSavedSongsByFan(Pageable pageable);

}
