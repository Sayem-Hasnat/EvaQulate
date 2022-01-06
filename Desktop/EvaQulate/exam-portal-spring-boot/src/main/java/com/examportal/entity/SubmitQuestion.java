package com.examportal.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "submit_question")
@Getter
@Setter
@NoArgsConstructor
public class SubmitQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long submitQuestionId;

    @Column
    private long questionId;

    @Column(length = 5000)
    private String content;

    @Column
    private String option1;

    @Column
    private String option2;

    @Column
    private String option3;

    @Column
    private String option4;

    @Column
    private String answer;

    @Column
    private String givenAnswer;
}
