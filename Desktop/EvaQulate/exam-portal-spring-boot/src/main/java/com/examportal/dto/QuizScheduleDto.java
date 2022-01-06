package com.examportal.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuizScheduleDto {
    private long quizId;
    private String date;
    private String startTime;
    private String endTime;
}
