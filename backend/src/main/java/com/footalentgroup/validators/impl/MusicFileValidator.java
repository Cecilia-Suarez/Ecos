package com.footalentgroup.validators.impl;

import com.footalentgroup.validators.MusicFile;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class MusicFileValidator implements ConstraintValidator<MusicFile, MultipartFile> {

    private static final List<String> ALLOWED_TYPES = List.of(
            "audio/mpeg",  // MP3
            "audio/wav",   // WAV
            "audio/flac",  // FLAC
            "audio/ogg",   // OGG
            "audio/mp4"    // MP4
    );

    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext context) {
        if (file == null || file.isEmpty()) {
            return true;
        }
        return ALLOWED_TYPES.contains(file.getContentType());
    }
}
