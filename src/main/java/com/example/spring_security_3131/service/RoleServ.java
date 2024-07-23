package com.example.spring_security_3131.service;


import com.example.spring_security_3131.entities.Role;

import java.util.Set;

public interface RoleServ {
    Set<Role> getAllRoles();

    void saveRole(Role role);
}
