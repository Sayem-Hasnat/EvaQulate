package com.examportal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizDto {
    private long quizId;
    private String title;
    private String description;
    private int numberOfQuestion;
    private double maxMarks;
    private String createdBy;
    private String code;
    private Boolean isPublic;
    private Boolean isEnable = false;
    private String date;
    private String startTime;
    private String endTime;

    private CategoryDto categoryDto;
}
