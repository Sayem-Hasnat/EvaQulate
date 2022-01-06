package com.examportal.repository;

import com.examportal.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    @EntityGraph(attributePaths = "roleList")
    User findByUsername(String username);
}