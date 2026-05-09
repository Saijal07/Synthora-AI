package com.contentforge.controller;

import com.contentforge.dto.*;
import com.contentforge.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getProfile(
            @AuthenticationPrincipal UserDetails userDetails) {
        UserProfileResponse data = userService.getProfile(userDetails.getUsername());
        return ResponseEntity.ok(ApiResponse.success("Profile fetched", data));
    }

    @PostMapping("/upgrade")
    public ResponseEntity<ApiResponse<UserProfileResponse>> upgradeToPro(
            @AuthenticationPrincipal UserDetails userDetails) {
        UserProfileResponse data = userService.upgradeToPro(userDetails.getUsername());
        return ResponseEntity.ok(
            ApiResponse.success("Upgraded to Pro successfully", data));
    }
}