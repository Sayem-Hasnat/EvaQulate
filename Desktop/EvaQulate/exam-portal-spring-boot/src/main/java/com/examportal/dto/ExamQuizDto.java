package com.examportal.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ExamQuizDto {
    private long quizId;
    private String title;
    private int numberOfQuestion;
    private double maxMarks;
    private long quizTime;
    private long remainingTime;

    private List<QuestionDto> questionDtoList;
}
