package com.footalentgroup.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.footalentgroup.services.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    private final Cloudinary cloudinary;

    public Map<String, Object> uploadImage(MultipartFile file) {
        try {
            return cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new RuntimeException("Error al subir la imagen a Cloudinary", e);
        }
    }

    public Map<String, Object> uploadAudio(MultipartFile file) {
        try {
            return cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap("resource_type", "video")
            );
        } catch (IOException e) {
            throw new RuntimeException("Error al subir el audio", e);
        }
    }

    public void deleteImage(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteAudio(String publicId) {
        try {
            Map result = cloudinary.uploader().destroy(
                    publicId,
                    ObjectUtils.asMap("resource_type", "video")
            );
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Error al eliminar archivo de Cloudinary", e);
        }
    }
}
