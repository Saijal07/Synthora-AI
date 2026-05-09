package com.contentforge.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

    private String token;

    private String name;

    private String email;

    private String role;

    private Integer totalCredits;

    private Integer freeCredits;

    private Integer usedCredits;

    private Integer remainingCredits;

    private Boolean isPro;

    private LocalDateTime createdAt;
}