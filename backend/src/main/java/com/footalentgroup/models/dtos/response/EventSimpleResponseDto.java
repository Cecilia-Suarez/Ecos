package com.footalentgroup.models.dtos.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EventSimpleResponseDto {
    private Long id;
    private String name;
    private String category;
    private LocalDate date;
    private String description;
    private String image;
}
