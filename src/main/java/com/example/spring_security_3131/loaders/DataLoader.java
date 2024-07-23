package com.example.spring_security_3131.loaders;

import com.example.spring_security_3131.entities.Role;
import com.example.spring_security_3131.entities.User;
import com.example.spring_security_3131.service.RoleService;
import com.example.spring_security_3131.service.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;

@Component
public class DataLoader {
    private final RoleService roleService;
    private final UserService userService;

    public DataLoader(RoleService roleService, UserService userService) {
        this.roleService = roleService;
        this.userService = userService;
    }
    @PostConstruct
    @Transactional
    void dataLoad() {
        Role roleUser = new Role();
        roleUser.setName("ROLE_USER");
        roleService.saveRole(roleUser);

        Role roleAdmin = new Role();
        roleAdmin.setName("ROLE_ADMIN");
        roleService.saveRole(roleAdmin);

        User user1 = new User();
        user1.setEmail("user@user.ru");
        user1.setUsername("user");
        user1.setPassword("user");
        user1.setRoles(new HashSet<>(List.of(roleUser)));
        userService.saveUser(user1);

        User admin = new User();
        admin.setEmail("admin@admin.ru");
        admin.setUsername("admin");
        admin.setPassword("admin");
        admin.setRoles(new HashSet<>(List.of(roleAdmin)));
        userService.saveUser(admin);

    }

}
