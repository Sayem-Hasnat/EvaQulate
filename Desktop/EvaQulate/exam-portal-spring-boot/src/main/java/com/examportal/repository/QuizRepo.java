package com.examportal.repository;

import com.examportal.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepo extends JpaRepository<Quiz, Long> {
    @Query
    List<Quiz> findAllByCreatedBy(String username);

    @Query
    Quiz findByCode(String code);

    @Query
    List<Quiz> findAllByIsEnableAndIsPublic(Boolean isEnable, Boolean isPublic);

}