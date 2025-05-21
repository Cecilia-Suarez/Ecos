package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.FanProfileNotFoundException;
import com.footalentgroup.models.dtos.mapper.FanProfileMapper;
import com.footalentgroup.models.dtos.request.FanProfileRequestDto;
import com.footalentgroup.models.dtos.response.FanProfileResponseDto;
import com.footalentgroup.models.entities.FanProfileEntity;
import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.repositories.FanProfileRepository;
import com.footalentgroup.services.AuthenticatedUserService;
import com.footalentgroup.services.CloudinaryService;
import com.footalentgroup.services.FanProfileService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@AllArgsConstructor
@Service
public class FanProfileServiceImp implements FanProfileService {
    private final FanProfileRepository fanProfileRepository;
    private final FanProfileMapper fanMapper;
    private final CloudinaryService cloudinaryService;
    private final AuthenticatedUserService authenticatedUserService;

    @Override
    public FanProfileResponseDto getFanProfileById(Long id) {
        FanProfileEntity fan = fanProfileRepository.findById(id)
                .orElseThrow(() -> new FanProfileNotFoundException("El perfil de fan con ID " + id + " no existe."));

        return fanMapper.toResponse(fan);
    }

    @Override
    public void createFanProfile(UserEntity user) {
        FanProfileEntity fan = new FanProfileEntity();
        fan.setUser(user);
        fanProfileRepository.save(fan);
    }

    @Override
    public void updateFanProfile(FanProfileRequestDto requestDto) {
        String email = authenticatedUserService.getAuthenticatedUsername();
        FanProfileEntity fan = fanProfileRepository.findByUserEmail(email)
                .orElseThrow(() -> new FanProfileNotFoundException("Operación inválida: el usuario autenticado no posee el rol FAN por lo tanto no cuenta con un perfil de fan."));
        fanMapper.updateEntity(requestDto, fan);

        updateGenresIfNeeded(requestDto, fan);
        updatePhotoIfNeeded(requestDto, fan);

        fanProfileRepository.save(fan);
    }

    private void updateGenresIfNeeded(FanProfileRequestDto request, FanProfileEntity fan) {
        if (request.genreInterest() != null && !request.genreInterest().isEmpty()) {
            for (String genre : request.genreInterest()) {
                if (!fan.getGenreInterest().contains(genre)) {
                    fan.getGenreInterest().add(genre);
                }
            }
        }
    }

    private void updatePhotoIfNeeded(FanProfileRequestDto requestDto, FanProfileEntity fan){
        if (requestDto.deletePhoto()) {
            if (fan.getPhotoPublicId() != null) {
                cloudinaryService.deleteImage(fan.getPhotoPublicId());
                fan.setPhotoUrl(null);
                fan.setPhotoPublicId(null);
            }
        } else if (requestDto.photo() != null && !requestDto.photo().isEmpty()) {
            if (fan.getPhotoPublicId() != null) {
                cloudinaryService.deleteImage(fan.getPhotoPublicId());
                fan.setPhotoUrl(null);
                fan.setPhotoPublicId(null);
            }
            Map<String, Object> uploadResult = cloudinaryService.uploadImage(requestDto.photo());
            fan.setPhotoUrl(uploadResult.get("url").toString());
            fan.setPhotoPublicId(uploadResult.get("public_id").toString());
        }
    }


}
