package com.footalentgroup.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class MailConfig {
    private final String host;
    private final Integer port;
    private final String username;
    private final String password;

    public MailConfig(@Value("${spring.mail.host}") String host,
                      @Value("${spring.mail.port}") Integer port,
                      @Value("${spring.mail.username}") String username,
                      @Value("${spring.mail.password}") String password
    ) {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
    }

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(username);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");

        return mailSender;
    }
}
