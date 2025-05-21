package com.footalentgroup.models.dtos.response;

public record MusicianProfileResponseDto(
        Long id,
        String stageName,
        String genre,
        String country,
        String description,
        String photoUrl,
        String whatsapp,
        String paymentLink,
        String paymentAlias,
        String cbu,
        String spotifyUrl,
        String youtubeUrl,
        String instagramUrl,
        String tiktokUrl
) {}