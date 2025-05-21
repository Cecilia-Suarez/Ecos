package com.footalentgroup.models.dtos.mapper;

import com.footalentgroup.models.dtos.request.FanProfileRequestDto;
import com.footalentgroup.models.dtos.response.FanProfileResponseDto;
import com.footalentgroup.models.entities.FanProfileEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface FanProfileMapper {
    @Mapping(target="photoUrl", ignore = true)
    FanProfileEntity toEntity(FanProfileRequestDto dto);

    @Mapping(source = "photoUrl", target="photoUrl")
    FanProfileResponseDto toResponse(FanProfileEntity entity);

    @Mapping(target="photoUrl", ignore = true)
    void updateEntity(FanProfileRequestDto dto, @MappingTarget FanProfileEntity entity);
}
