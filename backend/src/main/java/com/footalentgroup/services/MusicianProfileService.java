package com.footalentgroup.services;

import com.footalentgroup.models.dtos.request.BannerUploadReqestDto;
import com.footalentgroup.models.dtos.request.MusicianProfileRequestDto;
import com.footalentgroup.models.dtos.response.*;
import com.footalentgroup.models.entities.UserEntity;

public interface MusicianProfileService {
    MusicianProfileResponseDto getProfileById(Long id);
    BannerResponseDto getBannerByMusicianId(Long id);
    PageResponseDto<MusicianSimpleResponseDto> search(int page, int size, String q);
    DonationResponseDto getDonationInfo(Long id);
    void createProfile(UserEntity user);
    void updateProfile(MusicianProfileRequestDto requestDto);
    void updateBanner(BannerUploadReqestDto request);
}
