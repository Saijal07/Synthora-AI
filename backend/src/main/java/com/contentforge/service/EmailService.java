package com.contentforge.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.name}")
    private String appName;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Async
    public void sendWelcomeEmail(String toEmail, String name) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("Welcome to " + appName + "! 🎉");
            message.setText(
                "Hi " + name + ",\n\n" +
                "Welcome to " + appName + "! 🚀\n\n" +
                "You have 50 free AI generations to get started.\n\n" +
                "Here's what you can create:\n" +
                "• YouTube Descriptions\n" +
                "• Blog Posts\n" +
                "• Viral Titles\n" +
                "• Social Hooks\n" +
                "• Freelance Proposals\n\n" +
                "Get started here: " + frontendUrl + "/dashboard\n\n" +
                "All the best,\n" + appName + " Team"
            );
            mailSender.send(message);
            log.info("Welcome email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send welcome email to {}: {}", toEmail, e.getMessage());
        }
    }

    @Async
    public void sendPasswordResetEmail(String toEmail, String name, String resetToken) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject(appName + " - Password Reset Request");
            message.setText(
                "Hi " + name + ",\n\n" +
                "We received a request to reset your password.\n\n" +
                "Click the link below to reset your password (valid for 1 hour):\n" +
                frontendUrl + "/reset-password?token=" + resetToken + "\n\n" +
                "If you didn't request this, please ignore this email.\n\n" +
                "Best,\n" + appName + " Team"
            );
            mailSender.send(message);
            log.info("Password reset email sent to: {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send reset email to {}: {}", toEmail, e.getMessage());
        }
    }
}