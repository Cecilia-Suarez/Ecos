package com.footalentgroup.models.dtos.response;

import java.util.List;

public record FanProfileResponseDto (
        String photoUrl,
        List<String> genreInterest,
        String country
)
{
}
