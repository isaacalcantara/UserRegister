package com.api.UserRegister.controllers;

import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.UserRegister.entities.User;
import com.api.UserRegister.payloads.requests.ChangePasswordRequest;
import com.api.UserRegister.payloads.requests.CodeRequest;
import com.api.UserRegister.payloads.requests.LoginRequest;
import com.api.UserRegister.payloads.responses.ResponseLoginRequest;
import com.api.UserRegister.services.UserServices;

@RestController
@RequestMapping(value="/api")
public class UserController {

	@Autowired
	UserServices userServices;
	
	@GetMapping("/user/{id}" )
	public Optional<User> findById(@PathVariable(value="id") Integer id){
		return userServices.findById(id);
	}
	 
	@CrossOrigin(origins = "*")
	@PostMapping("/user/save")
	public User newUser(@RequestBody User user) {
		return userServices.registerUser(user);
	}
	
	@CrossOrigin(origins = "*")
	@PutMapping("/user/login")
	public ResponseLoginRequest authLogin(@RequestBody LoginRequest user) {
		return userServices.authUser(user.getEmail(), user.getPassword());
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("/user/login/authtoken")
	public String authLogin(@RequestBody CodeRequest request) {
		return userServices.verifyToken(request.getEmail());
	}
	
	@CrossOrigin(origins = "*")
	@PutMapping("/user/login/recuper")
	public Boolean recoverPassword(@RequestBody CodeRequest request) throws MessagingException {
		return userServices.findByEmailAndGenerateRecuperationCode(request.getEmail());
	}
	
	@CrossOrigin(origins = "*")
	@PostMapping("/user/login/recuper/send")
	public Boolean authRecuperation(@RequestBody ChangePasswordRequest request) {
		return false;	
	}
	
}
