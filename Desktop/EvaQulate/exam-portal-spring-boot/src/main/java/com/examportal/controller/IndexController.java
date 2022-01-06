package com.examportal.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {
    @RequestMapping("/")
    public String welcome() {
        return "Exam Portal Application Using Spring Boot & Angular";
    }

    @RequestMapping("/check")
    public String checkAuthenticate() {
        return "User is Authenticated";
    }
}