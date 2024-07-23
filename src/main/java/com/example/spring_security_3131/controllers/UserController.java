package com.example.spring_security_3131.controllers;


import com.example.spring_security_3131.entities.User;
import com.example.spring_security_3131.repositories.UserRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/userProfile")
public class UserController {
    private final UserRepo userRepo;

    public UserController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping()
    public ResponseEntity<User> getUser(Principal principal) {
        User user = userRepo.findByUsername(principal.getName());
        return ResponseEntity.ok(user);
    }
}
