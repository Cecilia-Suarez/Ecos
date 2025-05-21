package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.NotFoundException;
import com.footalentgroup.models.dtos.mapper.EventMapper;
import com.footalentgroup.models.dtos.request.EventRequestDto;
import com.footalentgroup.models.dtos.response.EventResponseDto;
import com.footalentgroup.models.dtos.response.EventSimpleResponseDto;
import com.footalentgroup.models.dtos.response.PageResponseDto;
import com.footalentgroup.models.entities.EventEntity;
import com.footalentgroup.models.entities.MusicianProfileEntity;
import com.footalentgroup.models.entities.TicketEntity;
import com.footalentgroup.repositories.EventRepository;
import com.footalentgroup.repositories.MusicianProfileRepository;
import com.footalentgroup.services.CloudinaryService;
import com.footalentgroup.services.EventService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final MusicianProfileRepository musicianRepository;
    private final CloudinaryService cloudinaryService;
    private final EventMapper eventMapper;

    @Override
    public EventResponseDto read(Long id) {
        EventEntity event = this.eventRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Evento no encontrado: " + id));
        return this.eventMapper.toDto(event);
    }

    @Override
    public PageResponseDto<EventSimpleResponseDto> search(int page, int size) {
        Page<EventEntity> eventPage = this.eventRepository
                .findByDateAfterOrderByDateAsc(
                        LocalDate.now(),
                        PageRequest.of(page, size, Sort.by("date").ascending())
                );

        return this.eventMapper.toPagedDto(eventPage);
    }

    @Override
    public PageResponseDto<EventSimpleResponseDto> searchByMusician(Long musicianId, int page, int size) {
        Page<EventEntity> eventPage = this.eventRepository
                .findByMusicianIdAndDateAfterOrderByDateAsc(
                        musicianId,
                        LocalDate.now(),
                        PageRequest.of(page, size, Sort.by("date").ascending())
                );

        return this.eventMapper.toPagedDto(eventPage);
    }

    @Override
    @Transactional
    public EventResponseDto create(EventRequestDto eventDto) {
        eventDto.doDefault();

        MusicianProfileEntity musician = this.musicianRepository
                .findById(eventDto.getMusicianId())
                .orElseThrow(() -> new NotFoundException("Músico/Banda no encontrado"));

        EventEntity event = this.eventMapper.toEntity(eventDto);
        event.setMusician(musician);
        associateTicketsToEvent(event);
        saveImage(eventDto.getImage(), event);

        return this.eventMapper.toDto(this.eventRepository.save(event));
    }

    @Override
    @Transactional
    public EventResponseDto update(Long id, EventRequestDto eventDto) {
        eventDto.doDefault();

        EventEntity event = this.eventRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Evento no encontrado: " + id));

        this.eventMapper.updateEntity(eventDto, event);
        associateNewTicketsToEvent(event, eventDto);
        updateImage(eventDto.getImage(), event, eventDto.getDeleteImage());

        return this.eventMapper.toDto(this.eventRepository.save(event));
    }

    private void associateTicketsToEvent(EventEntity event) {
        if (event.getTickets() != null && !event.getTickets().isEmpty()) {
            event.getTickets().forEach(ticket -> ticket.setEvent(event));
        }
    }

    private void associateNewTicketsToEvent(EventEntity event, EventRequestDto eventDto) {
        event.getTickets().clear();
        List<TicketEntity> tickets = this.eventMapper.toTicketEntityList(eventDto.getTickets());
        tickets.forEach(ticket -> ticket.setEvent(event));
        event.getTickets().addAll(tickets);
    }

    private void saveImage(MultipartFile file, EventEntity event) {
        if (file != null && !file.isEmpty()) {
            Map<String, Object> image = cloudinaryService.uploadImage(file);
            event.setImage(image.get("secure_url").toString());
            event.setImagePublicId(image.get("public_id").toString());
        }
    }

    private void updateImage(MultipartFile file, EventEntity event, Boolean deleteImage) {
        if (deleteImage) {
            if (event.getImagePublicId() != null && !event.getImagePublicId().isEmpty()) {
                cloudinaryService.deleteImage(event.getImagePublicId());
                event.setImage(null);
                event.setImagePublicId(null);
            }
        } else if (file != null && !file.isEmpty()) {
            if (event.getImagePublicId() != null && !event.getImagePublicId().isEmpty()) {
                cloudinaryService.deleteImage(event.getImagePublicId());
            }

            saveImage(file, event);
        }
    }
}
