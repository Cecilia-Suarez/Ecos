package com.footalentgroup.models.dtos.response;

public record MusicianInfoResponseDto(
        Long artistId,
        String stageName,
        String photoUrl,
        String artistName,
        String spotifyUrl,
        String youtubeUrl

) {
}
