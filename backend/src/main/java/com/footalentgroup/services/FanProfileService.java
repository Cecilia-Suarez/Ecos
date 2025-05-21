package com.footalentgroup.services;

import com.footalentgroup.models.dtos.request.FanProfileRequestDto;
import com.footalentgroup.models.dtos.response.FanProfileResponseDto;
import com.footalentgroup.models.entities.UserEntity;

public interface FanProfileService {
    FanProfileResponseDto getFanProfileById(Long id);

    void createFanProfile(UserEntity user);

    void updateFanProfile(FanProfileRequestDto requestDto);

}
