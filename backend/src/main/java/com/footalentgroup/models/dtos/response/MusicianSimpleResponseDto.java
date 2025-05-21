package com.footalentgroup.models.dtos.response;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record MusicianSimpleResponseDto(
        Long id,
        String photoUrl,
        String stageName,
        String genre,
        String description
) {

}
