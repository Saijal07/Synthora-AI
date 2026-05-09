package com.contentforge.service;

import com.contentforge.dto.UserProfileResponse;
import com.contentforge.entity.User;
import com.contentforge.exception.AppException;
import com.contentforge.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    public UserProfileResponse getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> AppException.notFound("User not found"));
        return UserProfileResponse.from(user);
    }

    @Transactional
    public UserProfileResponse upgradeToPro(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> AppException.notFound("User not found"));
        user.setIsPro(true);
        userRepository.save(user);
        log.info("User upgraded to Pro: {}", email);
        return UserProfileResponse.from(user);
    }

    public List<UserProfileResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserProfileResponse::from)
                .collect(Collectors.toList());
    }
}