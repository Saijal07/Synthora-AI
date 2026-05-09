package com.contentforge.controller;

import com.contentforge.dto.*;
import com.contentforge.entity.ContentJob;
import com.contentforge.service.ContentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
public class ContentController {

    private final ContentService contentService;

    @PostMapping("/generate")
    public ResponseEntity<ApiResponse<ContentResponse>> generate(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody ContentRequest request) {
        ContentResponse data = contentService.createJob(
            userDetails.getUsername(), request);
        return ResponseEntity.ok(ApiResponse.success("Generation started", data));
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<ApiResponse<ContentResponse>> getJob(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        ContentResponse data = contentService.getJob(
            userDetails.getUsername(), id);
        return ResponseEntity.ok(ApiResponse.success("Job fetched", data));
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<ContentResponse>>> getHistory(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<ContentResponse> data = contentService.getHistory(
            userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("History fetched", data));
    }

    @GetMapping("/history/{type}")
    public ResponseEntity<ApiResponse<List<ContentResponse>>> getHistoryByType(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String type) {
        ContentJob.GeneratorType generatorType =
            ContentJob.GeneratorType.valueOf(type.toUpperCase());
        List<ContentResponse> data = contentService.getHistoryByType(
            userDetails.getUsername(), generatorType);
        return ResponseEntity.ok(ApiResponse.success("History fetched", data));
    }
}