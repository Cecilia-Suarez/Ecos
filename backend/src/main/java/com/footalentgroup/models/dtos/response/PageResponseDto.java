package com.footalentgroup.models.dtos.response;

import org.springframework.data.domain.Page;

import java.util.List;

public record PageResponseDto<T>(
        List<T> items,
        int page,
        int size,
        int totalPages,
        long totalItems,
        boolean first,
        boolean last
) {

    public static <T> PageResponseDto<T> from(Page<T> page) {
        return new PageResponseDto<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalPages(),
                page.getTotalElements(),
                page.isFirst(),
                page.isLast()
        );
    }
}
