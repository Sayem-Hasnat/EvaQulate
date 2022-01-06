package com.examportal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubmitQuestionDto {
    private long questionId;
    private String content;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String answer;
    private String givenAnswer;
}
