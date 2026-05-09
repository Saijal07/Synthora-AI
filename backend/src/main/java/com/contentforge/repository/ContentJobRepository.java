package com.contentforge.repository;

import com.contentforge.entity.ContentJob;
import com.contentforge.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

public interface ContentJobRepository extends JpaRepository<ContentJob, Long> {

    List<ContentJob> findByUserOrderByCreatedAtDesc(User user);

    List<ContentJob> findByUserAndGeneratorTypeOrderByCreatedAtDesc(
            User user, ContentJob.GeneratorType type);

    @Query("SELECT COUNT(j) FROM ContentJob j WHERE j.user = :user AND j.status = 'COMPLETED'")
    long countCompletedByUser(User user);

    Optional<ContentJob> findByIdAndUser(Long id, User user);
}