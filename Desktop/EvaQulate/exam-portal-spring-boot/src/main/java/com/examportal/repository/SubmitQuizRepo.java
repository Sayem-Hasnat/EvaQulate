package com.examportal.repository;

import com.examportal.entity.SubmitQuiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmitQuizRepo extends JpaRepository<SubmitQuiz,Long> {
    @Query
    List<SubmitQuiz> findAllByQuizId(long quizId);
}
