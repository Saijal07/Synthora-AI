package com.contentforge.service;

import com.contentforge.dto.ContentRequest;
import com.contentforge.dto.ContentResponse;
import com.contentforge.entity.ContentJob;
import com.contentforge.entity.User;
import com.contentforge.exception.AppException;
import com.contentforge.repository.ContentJobRepository;
import com.contentforge.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContentService {

    private final ContentJobRepository contentJobRepository;
    private final UserRepository userRepository;
    private final AiService aiService;

    @Transactional
    public ContentResponse createJob(String userEmail, ContentRequest request) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> AppException.notFound("User not found"));

        if (!Boolean.TRUE.equals(user.getIsPro())) {
            if (user.getFreeCredits() <= 0) {
                throw AppException.forbidden(
                    "You've used all 5 free generations. Upgrade to Pro for unlimited access.");
            }
            user.setFreeCredits(user.getFreeCredits() - 1);
            userRepository.save(user);
        }

        ContentJob job = ContentJob.builder()
                .user(user)
                .generatorType(request.getGeneratorType())
                .topic(request.getTopic().trim())
                .keywords(request.getKeywords())
                .tone(request.getTone() != null ? request.getTone() : "Professional")
                .extraInput(request.getExtraInput())
                .status(ContentJob.JobStatus.PROCESSING)
                .build();

        contentJobRepository.save(job);
        log.info("Content job created: {} for user: {}", job.getId(), userEmail);

        generateAsync(job.getId());
        return ContentResponse.from(job);
    }

    @Async
    @Transactional
    public void generateAsync(Long jobId) {
        ContentJob job = contentJobRepository.findById(jobId).orElse(null);
        if (job == null) return;

        try {
            String content = aiService.generate(job);
            job.setGeneratedContent(content);
            job.setStatus(ContentJob.JobStatus.COMPLETED);
            job.setCompletedAt(LocalDateTime.now());
            log.info("✅ Job {} completed", jobId);
        } catch (Exception e) {
            job.setStatus(ContentJob.JobStatus.FAILED);
            job.setErrorMessage(e.getMessage());
            log.error("❌ Job {} failed: {}", jobId, e.getMessage());
        }
        contentJobRepository.save(job);
    }

    public ContentResponse getJob(String userEmail, Long jobId) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> AppException.notFound("User not found"));
        ContentJob job = contentJobRepository.findByIdAndUser(jobId, user)
                .orElseThrow(() -> AppException.notFound("Job not found"));
        return ContentResponse.from(job);
    }

    public List<ContentResponse> getHistory(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> AppException.notFound("User not found"));
        return contentJobRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(ContentResponse::from)
                .collect(Collectors.toList());
    }

    public List<ContentResponse> getHistoryByType(
            String userEmail, ContentJob.GeneratorType type) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> AppException.notFound("User not found"));
        return contentJobRepository
                .findByUserAndGeneratorTypeOrderByCreatedAtDesc(user, type)
                .stream()
                .map(ContentResponse::from)
                .collect(Collectors.toList());
    }
}