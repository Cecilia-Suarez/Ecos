package com.footalentgroup.services;

import com.footalentgroup.models.dtos.request.EventRequestDto;
import com.footalentgroup.models.dtos.response.EventResponseDto;
import com.footalentgroup.models.dtos.response.EventSimpleResponseDto;
import com.footalentgroup.models.dtos.response.PageResponseDto;

public interface EventService {
    EventResponseDto read(Long id);
    PageResponseDto<EventSimpleResponseDto> search(int page, int size);
    PageResponseDto<EventSimpleResponseDto> searchByMusician(Long musicianId, int page, int size);
    EventResponseDto create(EventRequestDto eventDto);
    EventResponseDto update(Long id, EventRequestDto eventDto);
}
