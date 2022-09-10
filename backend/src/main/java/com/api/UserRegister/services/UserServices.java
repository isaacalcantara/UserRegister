package com.api.UserRegister.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.api.UserRegister.entities.User;
import com.api.UserRegister.repositories.UserRepository;

@Service
public class UserServices {
	
	
	@Autowired 
	UserRepository userRepository;
	
	private BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	public User registerUser(User newUser) {
		
		User existsUser = userRepository.findByEmail(newUser.getEmail());
		
		if(existsUser != null) {
			throw new Error("User already exists!");
		}
		
		newUser.setPassword(passwordEncoder().encode(newUser.getPassword()));
		return userRepository.save(newUser);
		
	}
	
	public List<User> findAllUsers(){
		return userRepository.findAll();
	}
	
	public Optional<User> findById(Integer id) {
		return userRepository.findById(id);
	}
	
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	public User authUser(String email, String password) {
		return userRepository.findByEmailAndPassword(email, password).orElse(null);
	}
	
}
