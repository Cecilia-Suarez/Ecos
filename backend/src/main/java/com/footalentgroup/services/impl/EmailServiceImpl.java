package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.EmailSendingException;
import com.footalentgroup.exceptions.NotFoundException;
import com.footalentgroup.models.dtos.request.ContactRequestDto;
import com.footalentgroup.repositories.MusicianProfileRepository;
import com.footalentgroup.services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;
    private final MusicianProfileRepository musicianRepository;

    @Override
    public void sendEmail(ContactRequestDto contact) {
        try {
            String to = getMusicianEmail(contact.getMusicianId());

            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(to);
            mail.setSubject(contact.getSubject());
            mail.setText(contact.getMessage());
            mail.setReplyTo(contact.getSenderEmail());

            mailSender.send(mail);
        } catch (MailException ex) {
            throw new EmailSendingException("Error al enviar el correo: " + ex.getMessage());
        }
    }

    private String getMusicianEmail(Long id) {
        return this.musicianRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Músico/Banda no encontrado: " + id))
                .getUser().getEmail();
    }
}
