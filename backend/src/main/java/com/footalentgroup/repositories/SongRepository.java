package com.footalentgroup.repositories;

import com.footalentgroup.models.entities.SongEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SongRepository extends JpaRepository<SongEntity,Long> {

    Optional<SongEntity> findByIdAndMusicianProfile_User_Email(Long idSong, String email);

    Page<SongEntity> findByMusicianProfileId(Long idMusician, Pageable pageable);

    Page<SongEntity> findByTitleContainingIgnoreCaseOrGenreContainingIgnoreCase(String title, String genre, Pageable pageable);

}
