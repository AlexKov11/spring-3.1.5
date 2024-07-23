package com.example.spring_security_3131.service;

import com.example.spring_security_3131.entities.Role;
import com.example.spring_security_3131.entities.User;
import com.example.spring_security_3131.repositories.RoleRepo;
import com.example.spring_security_3131.repositories.UserRepo;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService, UserServ {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepo roleRepo;

    public UserService(UserRepo userRepo, @Lazy PasswordEncoder passwordEncoder, RoleRepo roleRepo) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.roleRepo = roleRepo;
    }

    public User findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("User '%s' not found", username));
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                mapRolesAuthorities(user.getRoles()));
    }

    private Collection<? extends GrantedAuthority> mapRolesAuthorities(Collection<Role> roles) {
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getName())).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getListOfUsers() {
        return userRepo.findAll();
    }

    @Override
    @Transactional
    public void saveUser(User user) {
        createRolesIfNotExist();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
    }

    @Override
    @Transactional
    public void createRolesIfNotExist() {
        if (roleRepo.findByName("ROLE_USER").isEmpty()) {
            roleRepo.save(new Role(1L, "ROLE_USER"));
        }
        if (roleRepo.findByName("ROLE_ADMIN").isEmpty()) {
            roleRepo.save(new Role(2L, "ROLE_ADMIN"));
        }
    }

    @Override
    @Transactional
    public boolean updateUser(User userUp, Set<Role> roles) {
        User userFromDB = userRepo.findById(userUp.getId()).orElse(null);
        if (userFromDB != null) {
            userFromDB.setUsername(userUp.getUsername());
            userFromDB.setPassword(passwordEncoder.encode(userUp.getPassword()));
            userFromDB.setEmail(userUp.getEmail());
            userFromDB.setRoles(roles);
            userRepo.save(userFromDB);
            return true;
        } else {
            return false;
        }
    }

    @Override
    @Transactional
    public User getUserById(Long id) {
        User user = null;
        Optional<User> optionalUser = userRepo.findById(id);
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
        }
        return user;
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }

}
