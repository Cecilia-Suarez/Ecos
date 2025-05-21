package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.FanProfileNotFoundException;
import com.footalentgroup.exceptions.SongNotFoundException;
import com.footalentgroup.models.dtos.mapper.SongMapper;
import com.footalentgroup.models.dtos.response.PageResponseDto;
import com.footalentgroup.models.dtos.response.SongResponseDto;
import com.footalentgroup.models.entities.FanProfileEntity;
import com.footalentgroup.models.entities.SavedSongEntity;
import com.footalentgroup.models.entities.SongEntity;
import com.footalentgroup.repositories.FanProfileRepository;
import com.footalentgroup.repositories.SavedSongRepository;
import com.footalentgroup.repositories.SongRepository;
import com.footalentgroup.services.AuthenticatedUserService;
import com.footalentgroup.services.SavedSongService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;

@RequiredArgsConstructor
@Service
public class SavedSongServiceImpl implements SavedSongService {
    private final SavedSongRepository savedSongRepository;
    private final AuthenticatedUserService authenticatedUserService;
    private final FanProfileRepository fanRepository;
    private final SongRepository songRepository;
    private final SongMapper songMapper;

    @Override
    public void saveSongAsFavourite(Long song_id) {
       String email = authenticatedUserService.getAuthenticatedUsername();
       FanProfileEntity fan= fanRepository.findByUserEmail(email)
               .orElseThrow(() -> new FanProfileNotFoundException("No se encontró un perfil de fan asociado al usuario autenticado"));

       SavedSongEntity savedSong = savedSongRepository.findByFanIdAndSongId(fan.getId(), song_id);
       if(savedSong !=null){
           this.restoreSavedSongIfDeleted(savedSong);
       }else{
           this.createNewFavouriteSong(fan, song_id);
       }
    }

    @Override
    public void deleteSongFromFavourites(Long song_id) {
        String email = authenticatedUserService.getAuthenticatedUsername();

        FanProfileEntity fan = fanRepository.findByUserEmail(email)
                .orElseThrow(() -> new FanProfileNotFoundException("No se encontró un perfil de fan asociado al usuario autenticado"));

        SavedSongEntity savedSong = savedSongRepository.findByFanIdAndSongId(fan.getId(), song_id);

        if (savedSong != null && savedSong.getDeletedAt() == null) {
            savedSong.setDeletedAt(OffsetDateTime.now());
            savedSong.setUpdatedAt(OffsetDateTime.now());
            savedSongRepository.save(savedSong);
        } else {
            throw new SongNotFoundException("La canción con ID " + song_id + " no se encuentra guardada en tus canciones");
        }
    }

    @Override
    public PageResponseDto<SongResponseDto> getSavedSongsByFan(Pageable pageable) {
        String email = authenticatedUserService.getAuthenticatedUsername();

        FanProfileEntity fan = fanRepository.findByUserEmail(email)
                .orElseThrow(() -> new FanProfileNotFoundException("No se encontró un perfil de fan asociado al usuario autenticado"));

        Page<SongEntity> songPage = savedSongRepository.findSongsByFanId(fan.getId(), pageable);
        return songMapper.toPageResponse(songPage);
    }


    private void restoreSavedSongIfDeleted(SavedSongEntity savedSong) {
        if(savedSong.getDeletedAt() != null){
            savedSong.setDeletedAt(null);
            savedSong.setUpdatedAt(OffsetDateTime.now());
            savedSongRepository.save(savedSong);
        }
    }

    private void createNewFavouriteSong (FanProfileEntity fan, Long song_id) {
        SongEntity song= songRepository.findById(song_id)
                .orElseThrow(()-> new SongNotFoundException("Canción no encontrada"));

        SavedSongEntity savedSong = new SavedSongEntity();
        savedSong.setFan(fan);
        savedSong.setSong(song);
        savedSong.setDeletedAt(null);
        savedSongRepository.save(savedSong);
    }
}
