package com.contentforge.dto;

import com.contentforge.entity.ContentJob;
import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContentResponse {
    private Long id;
    private String generatorType;
    private String topic;
    private String keywords;
    private String tone;
    private String generatedContent;
    private String status;
    private String errorMessage;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;

    public static ContentResponse from(ContentJob job) {
        return ContentResponse.builder()
                .id(job.getId())
                .generatorType(job.getGeneratorType().name())
                .topic(job.getTopic())
                .keywords(job.getKeywords())
                .tone(job.getTone())
                .generatedContent(job.getGeneratedContent())
                .status(job.getStatus().name())
                .errorMessage(job.getErrorMessage())
                .createdAt(job.getCreatedAt())
                .completedAt(job.getCompletedAt())
                .build();
    }
}