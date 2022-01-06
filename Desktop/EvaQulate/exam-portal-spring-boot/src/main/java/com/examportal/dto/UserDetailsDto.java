package com.examportal.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class UserDetailsDto {
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String mobile;
    private List<String> roleList;
}
