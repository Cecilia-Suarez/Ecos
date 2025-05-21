package com.footalentgroup.services;

import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface CloudinaryService {
    Map<String, Object> uploadImage(MultipartFile file);

    Map<String, Object> uploadAudio(MultipartFile file);

    void deleteImage(String publicId);

    void deleteAudio(String publicId);
}
