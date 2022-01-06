package com.examportal.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Email{
    private String from;
    private String to;
    private String subject;
    private String body;
}
