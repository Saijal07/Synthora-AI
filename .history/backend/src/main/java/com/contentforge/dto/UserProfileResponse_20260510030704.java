package com.contentforge.dto;

import com.contentforge.entity.User;
import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileResponse {
    private Long id;
    private String name;
    private String email;
    private String role;
    private Integer totalCredits;
    private Integer freeCredits;
    private Integer usedCredits;
    private Integer remainingCredits;
    private Boolean isPro;
    private Boolean isVerified;
    private LocalDateTime createdAt;

    public static UserProfileResponse from(User user) {
        return UserProfileResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .totalCredits(user.getTotalCredits())
                .freeCredits(user.getFreeCredits())
                .usedCredits(user.getUsedCredits())
                .remainingCredits(user.getRemainingCredits())
                .isPro(user.getIsPro())
                .isVerified(user.getIsVerified())
                .createdAt(user.getCreatedAt())
                .build();
    }
}