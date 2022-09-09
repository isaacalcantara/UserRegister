package com.api.UserRegister.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.UserRegister.entities.User;
import com.api.UserRegister.services.UserServices;

@RestController
@RequestMapping(value="/api")
public class UserController {

	@Autowired
	UserServices userServices;
	
	
	@GetMapping("/user/all")
	public List<User> findAll(){
		return userServices.findAllUsers();
	}
	
	@GetMapping("/user/{id}" )
	public Optional<User> findById(@PathVariable(value="id") Integer id){
		return userServices.findById(id);
	}
	 
	@PostMapping("/user/save")
	public User newUser(@RequestBody User user) {
		return userServices.registerUser(user);
	}
	
	@PostMapping("/user/login")
	public User authLogin(@RequestBody User user) {
		return userServices.authUser(user.getEmail(), user.getPassword());
	}
	
}
