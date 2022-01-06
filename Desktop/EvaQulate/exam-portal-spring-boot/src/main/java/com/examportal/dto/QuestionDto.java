package com.examportal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionDto {
    private long questionId;
    private String content;
    private String image;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String answer;

    private long quizId;
}