package com.contentforge.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "total_credits")
    private Integer totalCredits;

    @Column(name = "free_credits", nullable = false)
    private Integer freeCredits;

    @Column(name = "is_pro", nullable = false)
    private Boolean isPro;

    @Column(name = "is_verified", nullable = false)
    private Boolean isVerified;

    @Column(name = "reset_token")
    private String resetToken;

    @Column(name = "reset_token_expiry")
    private LocalDateTime resetTokenExpiry;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        totalCredits = 50;  // Free tier starts with 50 credits
        freeCredits = 50;   // All 50 credits are initially remaining
        isPro = false;
        isVerified = false;
        role = Role.USER;
    }

    public Integer getUsedCredits() {
        return totalCredits - freeCredits;
    }

    public Integer getRemainingCredits() {
        return freeCredits;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public String generateResetToken() {
        this.resetToken = UUID.randomUUID().toString();
        this.resetTokenExpiry = LocalDateTime.now().plusHours(1);
        return this.resetToken;
    }

    public boolean isResetTokenValid(String token) {
        return this.resetToken != null
                && this.resetToken.equals(token)
                && this.resetTokenExpiry != null
                && this.resetTokenExpiry.isAfter(LocalDateTime.now());
    }
}