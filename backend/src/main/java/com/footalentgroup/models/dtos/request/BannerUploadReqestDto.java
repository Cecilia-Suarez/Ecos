package com.footalentgroup.models.dtos.request;

import com.footalentgroup.validators.ImageFile;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.web.multipart.MultipartFile;

public record BannerUploadReqestDto(
        @ImageFile
        MultipartFile banner,

        @Schema(description = "Campo para indicar que se desea eliminar el banner", defaultValue = "false", required = true)
        boolean deleteBanner
) {
}
