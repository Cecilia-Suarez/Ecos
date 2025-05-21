package com.footalentgroup.repositories;
import com.footalentgroup.models.entities.SavedSongEntity;
import com.footalentgroup.models.entities.SongEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface SavedSongRepository extends JpaRepository<SavedSongEntity, Long> {


    SavedSongEntity findByFanIdAndSongId(Long fan_id, Long song_id);

    @Query(""" 
          SELECT se 
          FROM SongEntity se 
          JOIN se.savedByFans ss 
          WHERE ss.fan.id = :fanId AND ss.deletedAt IS NULL 
    """)
    Page<SongEntity> findSongsByFanId(@Param("fanId") Long fanId, Pageable pageable);
}
