package com.footalentgroup.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.footalentgroup.models.entities.UserEntity;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

@Service
public class JwtService {
    private static final String ID_CLAIM = "id";
    private static final String NAME_CLAIM = "name";
    private static final String EMAIL_CLAIM = "email";
    private static final String ROLE_CLAIM = "role";

    private final String secret;
    private final String issuer;
    private final int accessExpiration;
    private final int refreshExpiration;

    public JwtService(@Value("${jwt.secret}") String secret,
                      @Value("${jwt.issuer}") String issuer,
                      @Value("${jwt.expire}") int accessExpiration,
                      @Value("${jwt.refresh.token.expiration}") int refreshExpiration) {
        this.secret = secret;
        this.issuer = issuer;
        this.accessExpiration = accessExpiration;
        this.refreshExpiration = refreshExpiration;
    }

    public String extractToken(String bearer) {
        if (bearer != null && bearer.startsWith("Bearer ") && 3 == bearer.split("\\.").length) {
            return bearer.substring(7);
        }

        return "";
    }

    public String extractRefreshToken(HttpServletRequest request) {
        if (request.getCookies() != null) {
            return Arrays.stream(request.getCookies())
                    .filter(cookie -> "refresh_token".equals(cookie.getName()))
                    .map(Cookie::getValue)
                    .findFirst()
                    .orElse(null);
        }

        return null;
    }

    public String generateAccessToken(UserEntity user) {
        return generateToken(user, this.accessExpiration);
    }

    public String generateRefreshToken(UserEntity user) {
        return generateToken(user, this.refreshExpiration);
    }

    public void setRefreshToken(HttpServletResponse response, String refreshToken) {
        Cookie refreshCookie = new Cookie("refresh_token", refreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setSecure(true);
        refreshCookie.setPath("/");
        refreshCookie.setMaxAge(this.refreshExpiration);

        response.addCookie(refreshCookie);
    }

    private String generateToken(UserEntity user, int expirationTime) {
        return JWT.create()
                .withIssuer(this.issuer)
                .withIssuedAt(new Date())
                .withNotBefore(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime * 1000L))
                .withClaim(ID_CLAIM, user.getId())
                .withClaim(NAME_CLAIM, user.getName())
                .withClaim(EMAIL_CLAIM, user.getEmail())
                .withClaim(ROLE_CLAIM, user.getRole().name())
                .sign(getAlgorithm());
    }

    public boolean isTokenExpired(String token) {
        Optional<DecodedJWT> decodedJWT = verifyToken(token);
        return decodedJWT.isEmpty() || decodedJWT.get().getExpiresAt().before(new Date());
    }

    public Long id(String token) {
        return extractClaim(token, ID_CLAIM, Long.class);
    }

    public String name(String token) {
        return extractClaim(token, NAME_CLAIM, String.class);
    }

    public String email(String token) {
        return extractClaim(token, EMAIL_CLAIM, String.class);
    }

    public String role(String token) {
        return extractClaim(token, ROLE_CLAIM, String.class);
    }

    private <T> T extractClaim(String token, String claim, Class<T> type) {
        return verifyToken(token)
                .map(jwt -> jwt.getClaim(claim).as(type))
                .orElse(null);
    }

    private Optional<DecodedJWT> verifyToken(String token) {
        try {
            return Optional.of(
                    JWT.require(getAlgorithm())
                    .withIssuer(this.issuer)
                    .build()
                    .verify(token)
            );
        } catch (JWTVerificationException ex) {
            return Optional.empty();
        }
    }

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(this.secret);
    }
}
