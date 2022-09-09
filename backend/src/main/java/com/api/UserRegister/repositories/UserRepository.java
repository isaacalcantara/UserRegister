package com.api.UserRegister.repositories;

import java.util.Optional;

import javax.swing.text.html.Option;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.UserRegister.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	Optional<User> findByEmailAndPassword(String email, String password);
	
	Optional<User> findById(Integer id);
}
