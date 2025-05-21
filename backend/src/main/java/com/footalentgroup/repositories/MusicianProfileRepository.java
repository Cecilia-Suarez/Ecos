package com.footalentgroup.repositories;

import com.footalentgroup.models.dtos.response.DonationResponseDto;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MusicianProfileRepository extends JpaRepository<MusicianProfileEntity, Long> {
    Optional<MusicianProfileEntity> findByUserEmail(String email);

    @Query(
            "SELECT new com.footalentgroup.models.dtos.response.DonationResponseDto(m.paymentLink, m.paymentAlias, m.cbu, m.user.email, m.photoUrl) " +
            "FROM MusicianProfileEntity m WHERE m.id = :id"
    )
    Optional<DonationResponseDto> findDonationInfoById(@Param("id") Long id);

    Page<MusicianProfileEntity> findAllByStageNameIsNotNullAndGenreIsNotNullAndCountryIsNotNull(Pageable pageable);

    Page<MusicianProfileEntity> findByStageNameContainingIgnoreCaseOrGenreContainingIgnoreCaseOrCountryContainingIgnoreCase(
            String stageName, String genre, String country, Pageable pageable
    );
}
