package com.footalentgroup.configuration;

import com.footalentgroup.models.entities.UserEntity;
import com.footalentgroup.models.enums.Role;
import com.footalentgroup.repositories.UserRepository;
import com.footalentgroup.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final String AUTHORIZATION = "Authorization";

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {
        String token = jwtService.extractToken(request.getHeader(AUTHORIZATION));

        if (request.getServletPath().contains("/auth") || token.isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        if (jwtService.isTokenExpired(token)) {
            token = handleExpiredToken(request, response);
        }

        authenticateUser(token);
        filterChain.doFilter(request, response);
    }

    private String handleExpiredToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = jwtService.extractRefreshToken(request);

        if (refreshToken != null && !refreshToken.isEmpty() && !jwtService.isTokenExpired(refreshToken)) {
            String email = jwtService.email(refreshToken);
            UserEntity user = userRepository.findByEmail(email).orElse(null);

            if (user != null) {
                String newAccessToken = jwtService.generateAccessToken(user);
                response.setHeader("Authorization", "Bearer " + newAccessToken);
                return newAccessToken;
            }
        }

        return null;
    }

    private void authenticateUser(String token) {
        if (token == null || token.isEmpty()) {
            return;
        }

        String email = jwtService.email(token);
        String role = jwtService.role(token);

        if (email != null && role != null) {
            GrantedAuthority authority = new SimpleGrantedAuthority(Role.PREFIX + role);
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(email, null, List.of(authority));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }
}