package com.footalentgroup.services;

import com.footalentgroup.TestConfig;
import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.models.enums.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

@TestConfig
class JwtServiceIT {

    @Autowired
    private JwtService jwtService;

    private UserEntity user;

    @BeforeEach
    void setup() {
        user = UserEntity.builder()
                .id(1L)
                .name("name")
                .email("email@example.com")
                .role(Role.FAN)
                .build();
    }

    @Test
    void testExtractToken() {
        assertEquals("t.t.t", jwtService.extractToken("Bearer t.t.t"));
    }

    @Test
    void testGenerateAndVerifyAccessToken() {
        String accessToken = jwtService.generateAccessToken(user);

        assertNotNull(accessToken);
        assertEquals(3, accessToken.split("\\.").length);

        assertEquals(1L, jwtService.id(accessToken));
        assertEquals("name", jwtService.name(accessToken));
        assertEquals("email@example.com", jwtService.email(accessToken));
        assertEquals("FAN", jwtService.role(accessToken));

        assertFalse(jwtService.isTokenExpired(accessToken));
    }

    @Test
    void testGenerateAndVerifyRefreshToken() {
        String refreshToken = jwtService.generateRefreshToken(user);

        assertNotNull(refreshToken);
        assertEquals(3, refreshToken.split("\\.").length);

        assertEquals(1L, jwtService.id(refreshToken));
        assertEquals("name", jwtService.name(refreshToken));
        assertEquals("email@example.com", jwtService.email(refreshToken));
        assertEquals("FAN", jwtService.role(refreshToken));

        assertFalse(jwtService.isTokenExpired(refreshToken));
    }

    @Test
    void testExpiredAccessToken() throws InterruptedException {
        String accessToken = jwtService.generateAccessToken(user);

        Thread.sleep((5 + 1) * 1000);

        assertTrue(jwtService.isTokenExpired(accessToken));
    }
}
