package com.footalentgroup.models.dtos.mapper;

import com.footalentgroup.models.dtos.request.SongUploadRequestDto;
import com.footalentgroup.models.dtos.response.MusicianInfoResponseDto;
import com.footalentgroup.models.dtos.response.PageResponseDto;
import com.footalentgroup.models.dtos.response.SongResponseDto;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import com.footalentgroup.models.entities.SongEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface SongMapper {

    @Mapping(target = "audioUrl", ignore = true)
    @Mapping(target = "spotifyUrl", ignore = true)
    SongEntity toEntity(SongUploadRequestDto dto);

    @Mapping(target = "musicianInfo", expression = "java(mapMusicianInfo(song.getMusicianProfile()))")
    SongResponseDto toSongResponseDto(SongEntity song);

    @Mapping(target = "audioUrl", ignore = true)
    @Mapping(target = "spotifyUrl", ignore = true)
    void updateEntity(SongUploadRequestDto requestDto, @MappingTarget SongEntity song);

    default MusicianInfoResponseDto mapMusicianInfo(MusicianProfileEntity musicianProfileEntity) {
        if (musicianProfileEntity == null) {
            return null;
        }

        return new MusicianInfoResponseDto(
                musicianProfileEntity.getId(),
                musicianProfileEntity.getStageName(),
                musicianProfileEntity.getPhotoUrl(),
                musicianProfileEntity.getUser().getName(),
                musicianProfileEntity.getSpotifyUrl(),
                musicianProfileEntity.getYoutubeUrl()
        );
    }

    default PageResponseDto<SongResponseDto> toPageResponse(Page<SongEntity> songPage) {
        List<SongResponseDto> songDtos = songPage.getContent().stream()
                .map(this::toSongResponseDto)
                .toList();

        return new PageResponseDto<>(
                songDtos,
                songPage.getNumber(),
                songPage.getSize(),
                songPage.getTotalPages(),
                songPage.getTotalElements(),
                songPage.isFirst(),
                songPage.isLast()
        );
    }
}
