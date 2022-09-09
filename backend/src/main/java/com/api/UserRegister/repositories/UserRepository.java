package com.api.UserRegister.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.UserRegister.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	Optional<User> findByEmailAndPassword(String email, String password);
}
