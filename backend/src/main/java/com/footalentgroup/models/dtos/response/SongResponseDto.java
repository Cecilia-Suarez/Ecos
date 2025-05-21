package com.footalentgroup.models.dtos.response;

public record SongResponseDto(
        Long id,
        String title,
        String genre,
        String audioUrl,
        String spotifyUrl,
        String youtubeUrl,
        MusicianInfoResponseDto musicianInfo
) {
}
