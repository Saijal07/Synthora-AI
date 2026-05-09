package com.contentforge.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "content_jobs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContentJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "generator_type", nullable = false)
    private GeneratorType generatorType;

    @Column(name = "topic", columnDefinition = "TEXT", nullable = false)
    private String topic;

    @Column(name = "keywords", columnDefinition = "TEXT")
    private String keywords;

    @Column(name = "tone")
    private String tone;

    @Column(name = "extra_input", columnDefinition = "TEXT")
    private String extraInput;

    @Column(name = "generated_content", columnDefinition = "TEXT")
    private String generatedContent;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobStatus status;

    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        status = JobStatus.PENDING;
    }

    public enum GeneratorType {
        YOUTUBE_DESCRIPTION,
        BLOG_POST,
        VIRAL_TITLE,
        FREELANCE_PROPOSAL,
        SOCIAL_HOOK
    }

    public enum JobStatus {
        PENDING, PROCESSING, COMPLETED, FAILED
    }
}