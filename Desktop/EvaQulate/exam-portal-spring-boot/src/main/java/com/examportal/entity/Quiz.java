package com.examportal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "quiz")
@Getter
@Setter
@NoArgsConstructor
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long quizId;

    @Column
    private String title;

    @Column(length = 500)
    private String description;

    @Column
    private int numberOfQuestion;

    @Column
    private double maxMarks;

    @Column
    private String createdBy;

    @Column
    private String code;

    @Column
    private Boolean isEnable;

    @Column
    private Boolean isPublic;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(name = "category_quiz",
            joinColumns = @JoinColumn(name = "quiz_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    private Category category;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "quiz_question",
            joinColumns = @JoinColumn(name = "quiz_id"),
            inverseJoinColumns = @JoinColumn(name = "question_id"))
    private Set<Question> questionSet = new HashSet<>();

    @Column
    private String date;

    @Column
    private String startTime;

    @Column
    private String endTime;
}