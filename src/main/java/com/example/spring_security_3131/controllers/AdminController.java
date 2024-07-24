package com.example.spring_security_3131.controllers;

import com.example.spring_security_3131.entities.Role;
import com.example.spring_security_3131.entities.User;
import com.example.spring_security_3131.service.RoleService;
import com.example.spring_security_3131.service.UserService;

import org.springframework.web.bind.annotation.*;

import java.util.*;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/adminProfile")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;

    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getListOfUsers(), HttpStatus.OK);
    }

    @GetMapping("/roles")
    public ResponseEntity<Set<Role>> getAllRoles() {
        return new ResponseEntity<>(roleService.getAllRoles(), HttpStatus.OK);
    }

    @PostMapping("/newUser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        userService.saveUser(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}/edit")
    public ResponseEntity<Map<String, Object>> editUser(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        response.put("roles", roleService.getAllRoles());
        response.put("user", userService.getUserById(id));
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<User> update(@RequestBody User user) {
        userService.saveUser(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id) {
        User user = userService.getUserById(id);
        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        try {
            userService.deleteUser(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
