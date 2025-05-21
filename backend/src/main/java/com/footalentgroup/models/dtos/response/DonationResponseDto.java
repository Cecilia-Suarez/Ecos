package com.footalentgroup.models.dtos.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DonationResponseDto {
    private String paymentLink;
    private String paymentAlias;
    private String cbu;
    private String email;
    private String image;
}
