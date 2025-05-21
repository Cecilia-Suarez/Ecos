package com.footalentgroup.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Table(name = "songs")
@Entity
@Data
@NoArgsConstructor
public class SongEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    String title;

    @Column(nullable = false)
    String genre;

    String audioUrl;
    String audioPublicId;

    String spotifyUrl;
    String youtubeUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "musician_id", nullable = false)
    private MusicianProfileEntity musicianProfile;

    @OneToMany(mappedBy = "song", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<SavedSongEntity> savedByFans;


}
