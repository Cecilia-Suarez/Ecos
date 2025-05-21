package com.footalentgroup.models.dtos.mapper;

import com.footalentgroup.models.dtos.request.MusicianProfileRequestDto;
import com.footalentgroup.models.dtos.response.MusicianProfileResponseDto;
import com.footalentgroup.models.dtos.response.MusicianSimpleResponseDto;
import com.footalentgroup.models.dtos.response.PageResponseDto;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MusicProfileMapper{

    @Mapping(target = "photoUrl", ignore = true)
    MusicianProfileEntity toEntity(MusicianProfileRequestDto dto);

    @Mapping(source = "photoUrl", target = "photoUrl")
    MusicianProfileResponseDto toResponse(MusicianProfileEntity entity);

    @Mapping(source = "photoUrl", target = "photoUrl")
    MusicianSimpleResponseDto toSimpleResponse(MusicianProfileEntity entity);

    List<MusicianSimpleResponseDto> toSimpleResponseList(List<MusicianProfileEntity> entities);

    @Mapping(target = "photoUrl", ignore = true)
    void updateEntity(MusicianProfileRequestDto dto, @MappingTarget MusicianProfileEntity entity);

    default PageResponseDto<MusicianSimpleResponseDto> toPageResponseDto(Page<MusicianProfileEntity> page) {
        List<MusicianSimpleResponseDto> musicians = toSimpleResponseList(page.getContent());

        return new PageResponseDto<>(
                musicians,
                page.getNumber(),
                page.getSize(),
                page.getTotalPages(),
                page.getTotalElements(),
                page.isFirst(),
                page.isLast()
        );
    }
}
