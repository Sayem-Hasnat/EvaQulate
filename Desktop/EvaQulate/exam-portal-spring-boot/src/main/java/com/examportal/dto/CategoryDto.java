package com.examportal.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class CategoryDto implements Serializable {
    private long categoryId;
    private String title;
    private String description;
}