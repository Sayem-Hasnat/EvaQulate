package com.examportal.entity;

import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity(name = "role")
@Setter
@NoArgsConstructor
public class Role implements GrantedAuthority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long roleId;

    @Column
    private String authority;

    public long getRoleId() {
        return roleId;
    }

    @Override
    public String getAuthority() {
        return this.authority;
    }

    public Role(String authority) {
        this.authority = authority;
    }
}
