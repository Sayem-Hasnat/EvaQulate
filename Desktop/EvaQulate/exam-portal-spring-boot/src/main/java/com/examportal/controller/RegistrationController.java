package com.examportal.controller;

import com.examportal.dto.ResponseDto;
import com.examportal.dto.UserDto;
import com.examportal.entity.User;
import com.examportal.service.UserService;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/registration")
@CrossOrigin
public class RegistrationController {
    private final UserService userService;

    public RegistrationController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/")
    public ResponseEntity<?> generateToken(@RequestBody UserDto userDto) {
        ResponseDto response;
        if (userService.isUserExist(userDto.getUsername())) {
            response = new ResponseDto("Username Already Used");
        } else {
            User user = new User();
            BeanUtils.copyProperties(userDto, user);
            userService.save(user,userDto.getUserType());
            response = new ResponseDto("Save Successfully");
        }
        return ResponseEntity.ok(response);
    }
}