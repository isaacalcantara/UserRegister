package com.api.UserRegister.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.UserRegister.entities.User;
import com.api.UserRegister.repositories.UserRepository;

@Service
public class UserServices {
	
	
	@Autowired 
	UserRepository userRepository;
	
	public User registerUser(String name, String email, String password, String tipo, Boolean status) {
			User newUser = new User();
			newUser.setName(name);
			newUser.setEmail(email);
			newUser.setPassword(password);
			newUser.setTipo(tipo);
			newUser.setStatus(status);
			return userRepository.save(newUser);
	}
	
	public User authUser(String email, String password) {
		return userRepository.findByEmailAndPassword(email, password).orElse(null);
	}
	
}
