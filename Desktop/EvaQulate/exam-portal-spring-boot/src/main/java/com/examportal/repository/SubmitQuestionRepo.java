package com.examportal.repository;

import com.examportal.entity.SubmitQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmitQuestionRepo extends JpaRepository<SubmitQuestion,Long> {
}
