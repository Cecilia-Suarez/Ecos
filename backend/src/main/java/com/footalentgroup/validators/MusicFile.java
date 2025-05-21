package com.footalentgroup.validators;

import com.footalentgroup.validators.impl.MusicFileValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = MusicFileValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MusicFile {
    String message() default "El archivo debe ser un archivo de música válido (mp3, wav, flac)";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
