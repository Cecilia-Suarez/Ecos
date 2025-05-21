package com.footalentgroup.models.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "fan_profiles")
public class FanProfileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String photoUrl;
    private String photoPublicId;

    @ElementCollection
    @CollectionTable(name = "fan_interest_genres", joinColumns = @JoinColumn(name = "fan_profile_id"))
    @Column(name = "genre")
    private List<String> genreInterest;

    private String country;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private UserEntity user;

    @OneToMany(mappedBy = "fan", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<SavedSongEntity> savedSongs;

}
