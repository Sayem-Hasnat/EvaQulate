package com.examportal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity(name = "category")
@Getter
@Setter
@NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long categoryId;

    @Column
    private String title;

    @Column
    private String description;

    @OneToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinTable(name = "category_quiz",
            joinColumns = @JoinColumn(name = "category_id"),
            inverseJoinColumns = @JoinColumn(name = "quiz_id"))
    private Set<Quiz> quizSet = new LinkedHashSet<>();

}