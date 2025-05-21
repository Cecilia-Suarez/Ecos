package com.footalentgroup.models.dtos.mapper;

import com.footalentgroup.models.dtos.request.EventRequestDto;
import com.footalentgroup.models.dtos.request.TicketRequestDto;
import com.footalentgroup.models.dtos.response.EventResponseDto;
import com.footalentgroup.models.dtos.response.EventSimpleResponseDto;
import com.footalentgroup.models.dtos.response.PageResponseDto;
import com.footalentgroup.models.entities.EventEntity;
import com.footalentgroup.models.entities.TicketEntity;
import org.mapstruct.*;
import org.springframework.data.domain.Page;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface EventMapper {

    // ========== EVENT MAPPINGS ==========

    @Mapping(target = "image", ignore = true)
    EventEntity toEntity(EventRequestDto dto);

    @Mapping(target = "musicianId", source = "musician.id")
    EventResponseDto toDto(EventEntity entity);

    @Mapping(target = "image", ignore = true)
    void updateEntity(EventRequestDto dto, @MappingTarget EventEntity entity);

    EventSimpleResponseDto toSimpleDto(EventEntity entity);

    List<EventSimpleResponseDto> toSimpleDtoList(List<EventEntity> entities);

    default PageResponseDto<EventSimpleResponseDto> toPagedDto(Page<EventEntity> page) {
        List<EventSimpleResponseDto> events = toSimpleDtoList(page.getContent());

        return new PageResponseDto<>(
                events,
                page.getNumber(),
                page.getSize(),
                page.getTotalPages(),
                page.getTotalElements(),
                page.isFirst(),
                page.isLast()
        );
    }

    // ========== TICKET MAPPINGS ==========

    List<TicketEntity> toTicketEntityList(List<TicketRequestDto> dto);

    TicketEntity toTicketEntity(TicketRequestDto dto);
}
