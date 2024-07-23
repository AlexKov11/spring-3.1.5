package com.example.spring_security_3131.service;

import com.example.spring_security_3131.entities.Role;
import com.example.spring_security_3131.entities.User;

import java.util.List;
import java.util.Set;

public interface UserServ {
    List<User> getListOfUsers();

    void saveUser(User user);

    void createRolesIfNotExist();

    User getUserById(Long id);

    void deleteUser(Long id);
    boolean updateUser(User userUp, Set<Role> roles);

}
