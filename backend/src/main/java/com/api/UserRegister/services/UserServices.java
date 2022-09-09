package com.api.UserRegister.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.UserRegister.entities.User;
import com.api.UserRegister.repositories.UserRepository;

@Service
public class UserServices {
	
	
	@Autowired 
	UserRepository userRepository;
	
	public User registerUser(User newUser) {
		return userRepository.save(newUser);
	}
	
	public List<User> findAllUsers(){
		return userRepository.findAll();
	}
	
	public Optional<User> findById(Integer id) {
		return userRepository.findById(id);
	}
	
	public User authUser(String email, String password) {
		return userRepository.findByEmailAndPassword(email, password).orElse(null);
	}
	
}
