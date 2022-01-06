package com.examportal.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class UserDto implements Serializable {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private String userType;
}