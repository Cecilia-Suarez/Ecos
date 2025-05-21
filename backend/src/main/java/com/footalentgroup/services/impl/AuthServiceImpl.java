package com.footalentgroup.services.impl;

import com.footalentgroup.exceptions.ConflictException;
import com.footalentgroup.models.dtos.request.LoginRequestDto;
import com.footalentgroup.models.dtos.response.TokenResponseDto;
import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.models.enums.Role;
import com.footalentgroup.repositories.UserRepository;
import com.footalentgroup.services.AuthService;
import com.footalentgroup.services.FanProfileService;
import com.footalentgroup.services.JwtService;
import com.footalentgroup.services.MusicianProfileService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final MusicianProfileService musicService;
    private final FanProfileService fanService;

    @Override
    @Transactional
    public TokenResponseDto createUser(UserEntity user, HttpServletResponse response) {
        assertEmailNotExist(user.getEmail());
        UserEntity savedUser = userRepository.save(user);

        if (Role.MUSICIAN.equals(user.getRole())) {
            musicService.createProfile(savedUser);
        }else if (Role.FAN.equals(user.getRole())) {
            fanService.createFanProfile(savedUser);
        }

        return generateToken(user, response);
    }

    @Override
    public TokenResponseDto login(LoginRequestDto loginDto,HttpServletResponse response) {
        UserEntity user = userRepository
                .findByEmail(loginDto.getEmail())
                .orElseThrow(() -> new BadCredentialsException(""));

        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("");
        }

        return generateToken(user, response);
    }

    private void assertEmailNotExist(String email) {
        this.userRepository
                .findByEmail(email)
                .ifPresent(user -> { throw new ConflictException("El correo ya está registrado: " + email); });
    }

    private TokenResponseDto generateToken(UserEntity user, HttpServletResponse response) {
        String accessToken = this.jwtService.generateAccessToken(user);
        String refreshToken = this.jwtService.generateRefreshToken(user);
        this.jwtService.setRefreshToken(response, refreshToken);

        return new TokenResponseDto(accessToken);
    }
}
