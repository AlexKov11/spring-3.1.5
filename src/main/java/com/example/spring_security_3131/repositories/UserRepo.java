package com.example.spring_security_3131.repositories;


import com.example.spring_security_3131.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    @Query("Select u from User u left join fetch u.roles where u.username=:username")
    User findByUsername(String username);

}
