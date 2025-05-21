package com.footalentgroup.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "musician_profiles")
public class MusicianProfileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String stageName;

    private String genre;

    private String country;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String photoUrl;
    private String photoPublicId;

    private String bannerUrl;
    private String bannerPublicId;

    private String whatsapp;

    private String paymentLink;

    private String paymentAlias;

    private String cbu;

    private String spotifyUrl;

    private String youtubeUrl;

    private String instagramUrl;

    private String tiktokUrl;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private UserEntity user;

    @OneToMany(mappedBy = "musicianProfile", fetch = FetchType.LAZY)
    private List<SongEntity> songs;
}