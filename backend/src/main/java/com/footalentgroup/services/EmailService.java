package com.footalentgroup.services;

import com.footalentgroup.models.dtos.request.ContactRequestDto;

public interface EmailService {
    void sendEmail(ContactRequestDto contact);
}
