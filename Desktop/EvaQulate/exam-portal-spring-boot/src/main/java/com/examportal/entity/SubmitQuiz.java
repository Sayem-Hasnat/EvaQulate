package com.examportal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "submit_quiz")
@Getter
@Setter
@NoArgsConstructor
public class SubmitQuiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long submitQuizId;

    @Column
    private long quizId;

    @Column
    private String title;

    @Column
    private String username;

    @Column
    private int numberOfQuestion;

    @Column
    private double maxMarks;

    @Column
    private int totalCorrectAnswer;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "submit_quiz_question",
            joinColumns = @JoinColumn(name = "submitQuizId"),
            inverseJoinColumns = @JoinColumn(name = "submitQuestionId"))
    private List<SubmitQuestion> submitQuestionList;
}
