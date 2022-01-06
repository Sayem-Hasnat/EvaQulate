package com.examportal.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SubmitQuizDto {
    private long submitQuizId;
    private long quizId;
    private String title;
    private int numberOfQuestion;
    private double maxMarks;
    private int totalCorrectAnswer;
    private String username;
    private List<SubmitQuestionDto> submitQuestionDtoList;
}
