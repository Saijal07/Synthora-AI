package com.contentforge.service;

import com.contentforge.entity.ContentJob;
import com.contentforge.exception.AppException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiService {

    @Value("${ai.api.key}")
    private String apiKey;

    @Value("${ai.api.url}")
    private String apiUrl;

    @Value("${ai.model}")
    private String model;

    private final RestTemplate restTemplate;

    public String generate(ContentJob job) {
        String prompt = buildPrompt(job);
        return callAiApi(prompt);
    }

    private String buildPrompt(ContentJob job) {
        String tone = job.getTone() != null ? job.getTone() : "Professional";
        String keywords = job.getKeywords() != null && !job.getKeywords().isBlank()
                ? " Keywords to include: " + job.getKeywords() + "." : "";
        String extra = job.getExtraInput() != null && !job.getExtraInput().isBlank()
                ? " Additional context: " + job.getExtraInput() + "." : "";

        return switch (job.getGeneratorType()) {
            case YOUTUBE_DESCRIPTION -> String.format(
                "Write an engaging YouTube video description for: \"%s\". " +
                "Tone: %s.%s%s Include a hook, key points, hashtags, and call to action.",
                job.getTopic(), tone, keywords, extra);

            case BLOG_POST -> String.format(
                "Write a complete blog post about: \"%s\". " +
                "Tone: %s.%s%s Include title, intro, 4-6 sections, conclusion. ~800 words.",
                job.getTopic(), tone, keywords, extra);

            case VIRAL_TITLE -> String.format(
                "Generate 10 viral titles for: \"%s\". " +
                "Tone: %s.%s%s Mix listicles, how-to, curiosity gaps, numbers, questions.",
                job.getTopic(), tone, keywords, extra);

            case FREELANCE_PROPOSAL -> String.format(
                "Write a freelance proposal for: \"%s\". " +
                "Tone: %s.%s%s Include opening, approach, timeline, and CTA.",
                job.getTopic(), tone, keywords, extra);

            case SOCIAL_HOOK -> String.format(
                "Generate 5 social media hooks for: \"%s\". " +
                "Tone: %s.%s%s For Twitter, LinkedIn, Instagram. Each under 2 sentences.",
                job.getTopic(), tone, keywords, extra);
        };
    }

    private String callAiApi(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);

        Map<String, Object> body = new HashMap<>();
        body.put("model", model);
        body.put("messages", List.of(message));
        body.put("max_tokens", 2000);
        body.put("temperature", 0.8);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                apiUrl, entity, Map.class);

            if (response.getBody() == null) {
                throw AppException.badRequest("Empty response from AI");
            }

            List<Map<String, Object>> choices =
                (List<Map<String, Object>>) response.getBody().get("choices");

            if (choices == null || choices.isEmpty()) {
                throw AppException.badRequest("No content generated");
            }

            Map<String, Object> msg =
                (Map<String, Object>) choices.get(0).get("message");
            return (String) msg.get("content");

        } catch (HttpClientErrorException e) {
            log.error("AI API error: {}", e.getResponseBodyAsString());
            throw AppException.badRequest("AI service error: " + e.getStatusCode());
        } catch (AppException e) {
            throw e;
        } catch (Exception e) {
            log.error("AI generation failed: {}", e.getMessage());
            throw AppException.badRequest("AI generation failed. Please try again.");
        }
    }
}