package com.contentforge.service;

import com.contentforge.dto.*;
import com.contentforge.entity.User;
import com.contentforge.exception.AppException;
import com.contentforge.repository.UserRepository;
import com.contentforge.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw AppException.badRequest("Email is already registered");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail().toLowerCase().trim())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        userRepository.save(user);

        try {
            emailService.sendWelcomeEmail(user.getEmail(), user.getName());
        } catch (Exception e) {
            log.warn("Welcome email failed: {}", e.getMessage());
        }

        log.info("New user registered: {}", user.getEmail());
        String token = jwtUtil.generateToken(user.getEmail());
        return buildAuthResponse(token, user);
    }

    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getEmail().toLowerCase().trim(),
                    request.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw AppException.unauthorized("Invalid email or password");
        }

        User user = userRepository.findByEmail(
            request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> AppException.notFound("User not found"));

        String token = jwtUtil.generateToken(user.getEmail());
        log.info("User logged in: {}", user.getEmail());
        return buildAuthResponse(token, user);
    }

    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .ifPresent(user -> {
                    String token = user.generateResetToken();
                    userRepository.save(user);
                    try {
                        emailService.sendPasswordResetEmail(
                            user.getEmail(), user.getName(), token);
                    } catch (Exception e) {
                        log.warn("Reset email failed: {}", e.getMessage());
                    }
                });
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        User user = userRepository.findByResetToken(request.getToken())
                .orElseThrow(() -> AppException.badRequest("Invalid reset token"));

        if (!user.isResetTokenValid(request.getToken())) {
            throw AppException.badRequest("Reset token has expired.");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);
        log.info("Password reset for: {}", user.getEmail());
    }

    private AuthResponse buildAuthResponse(String token, User user) {
        return AuthResponse.builder()
                .token(token)
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .totalCredits(user.getTotalCredits())
                .freeCredits(user.getFreeCredits())
                .usedCredits(user.getUsedCredits())
                .remainingCredits(user.getRemainingCredits())
                .isPro(user.getIsPro())
.createdAt(user.getCreatedAt())
.build();
    }
}