package com.footalentgroup.models.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.footalentgroup.models.enums.EventType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.type.TrueFalseConverter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "events")
public class EventEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private EventType type;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private LocalDate date;

    @Column(nullable = false)
    @Temporal(TemporalType.TIME)
    private LocalTime startTime;

    @Column(nullable = false)
    @Temporal(TemporalType.TIME)
    private LocalTime endTime;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = true)
    private String image;

    @Column(nullable = true)
    private String imagePublicId;

    @Convert(converter = TrueFalseConverter.class)
    private Boolean active;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<TicketEntity> tickets = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "musician_id", nullable = false)
    private MusicianProfileEntity musician;
}
