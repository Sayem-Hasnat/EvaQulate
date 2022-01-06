/*
package com.examportal.init;

import com.examportal.entity.Role;
import com.examportal.entity.User;
import com.examportal.repository.RoleRepo;
import com.examportal.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    private final RoleRepo roleRepo;
    private final UserService userService;

    public DataInitializer(RoleRepo roleRepo, UserService userService) {
        this.roleRepo = roleRepo;
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {
        List<Role> roleList = Arrays.asList(
                new Role("ADMIN"),
                new Role("TEACHER"),
                new Role("STUDENT")
        );

        */
/*roleRepo.saveAll(roleList);*//*


        List<Role> roleList1 = Arrays.asList(roleRepo.findById(1L).get());
        List<Role> roleList2 = Arrays.asList(roleRepo.findById(2L).get());
        List<Role> roleList3 = Arrays.asList(roleRepo.findById(3L).get());

        List<User> userList = Arrays.asList(
                new User("tajbir", "12345", "Taj", "Bir", "taj@gmail.com", "01681650106", roleList1),
                new User("nuva", "12345", "Tas", "Nuva", "nuva@gmail.com", "01850179564", roleList2),
                new User("parizad", "12345", "Miss", "Parizad", "pari@gmail.com", "01754566049", roleList3)
        );

        */
/*userService.saveAll(userList);*//*

    }
}*/
