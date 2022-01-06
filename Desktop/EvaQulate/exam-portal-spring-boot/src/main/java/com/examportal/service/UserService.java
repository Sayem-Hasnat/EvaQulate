package com.examportal.service;

import com.examportal.entity.Role;
import com.examportal.entity.User;
import com.examportal.repository.RoleRepo;
import com.examportal.repository.UserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UserService implements UserDetailsService {
    private final UserRepo userRepo;
    private final RoleRepo roleRepo;

    public UserService(UserRepo userRepo, RoleRepo roleRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
    }

    public void save(User user, String userType) {
        if (user.getAuthorities().isEmpty() && userType.equals("student")) {
            List<Role> roleList = Arrays.asList(roleRepo.findById(3L).get());
            user.setAuthorities(roleList);
        } else {
            List<Role> roleList = Arrays.asList(roleRepo.findById(2L).get());
            user.setAuthorities(roleList);
        }
        user.setPassword(passCustomEncoder().encode(user.getPassword()));
        userRepo.save(user);
    }

    public void saveAll(List<User> userList) {
        userList.forEach(user -> {
            user.setPassword(passCustomEncoder().encode(user.getPassword()));
        });
        userRepo.saveAll(userList);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User Not Found");
        }
        return user;
    }

    public boolean isUserExist(String username) {
        User user = userRepo.findByUsername(username);
        if (user != null) {
            return true;
        } else {
            return false;
        }
    }

    public String getEmail(String username) {
        return userRepo.findByUsername(username).getEmail();
    }

    /*-------------------------------HELPER METHOD--------------------------------*/
    public PasswordEncoder passCustomEncoder() {
        return new BCryptPasswordEncoder();
    }


}