package com.example.spring_security_3131.service;

import com.example.spring_security_3131.entities.Role;
import com.example.spring_security_3131.repositories.RoleRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
public class RoleService implements RoleServ {
    private final RoleRepo roleRepo;

    public RoleService(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    @Transactional(readOnly = true)
    public Set<Role> getAllRoles() {
        return new HashSet<>(roleRepo.findAll());
    }

    @Override
    @Transactional
    public void saveRole(Role role) {
        roleRepo.save(role);
    }
}
