package com.footalentgroup.models.entities;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.OffsetDateTime;

@Entity
@Data
@NoArgsConstructor
@Table(name = "saved_songs",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"fan_id", "song_id"})})
public class SavedSongEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    @Column(updatable = false)
    private OffsetDateTime created_at;

    @Column(name = "deleted_at", nullable = true)
    private OffsetDateTime deletedAt;

    @UpdateTimestamp
    @Column(insertable = false)
    private OffsetDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "song_id", nullable = false)
    private SongEntity song;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fan_id", nullable = false)
    private FanProfileEntity fan;

}
