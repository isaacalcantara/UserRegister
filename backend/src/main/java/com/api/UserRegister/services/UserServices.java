package com.api.UserRegister.services;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.UserRegister.entities.User;
import com.api.UserRegister.repositories.UserRepository;

@Service
public class UserServices {
	
	
	@Autowired 
	private UserRepository userRepository;
	
	@Autowired
	private EmailService emailService;
	
/*	private BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}*/
	
	public User registerUser(User newUser) {
		
		User existsUser = userRepository.findByEmail(newUser.getEmail());
		
		if(existsUser != null) {
			throw new Error("User already exists!");
		}
		
		//newUser.setPassword(passwordEncoder().encode(newUser.getPassword()));
		return userRepository.save(newUser);
		
	}
	
	public List<User> findAllUsers(){
		return userRepository.findAll();
	}
	
	public Optional<User> findById(Integer id) {
		return userRepository.findById(id);
	}
	
	public Boolean findByEmailAndGenerateRecuperationCode(String email) throws MessagingException {
		User user = userRepository.findByEmail(email);
		if(user != null) {
			
			Random random = new Random();
			
			String n1 = Integer.toString(random.nextInt(10));
			String n2 = Integer.toString(random.nextInt(10));
			String n3 = Integer.toString(random.nextInt(10));
			String n4 = Integer.toString(random.nextInt(10));
			String n5 = Integer.toString(random.nextInt(10));
			String n6 = Integer.toString(random.nextInt(10));
			
			String recuperationCode = n1+n2+n3+n4+n5+n6;
			
			user.setRec_code(recuperationCode);
			
			userRepository.save(user);
			
			emailService.enviarEmail(email, recuperationCode);
	
			return true;
		}else {
			return false;
		}
	}
	
	public Boolean authUser(String email, String password) {
		//password = passwordEncoder().encode(password);
		
		User user = userRepository.findByEmailAndPassword(email, password).orElse(null);
		if(user != null) {
			return true;
		}else {
			return false;
		}
	}
	
	/*public Boolean authUpdate(ChangePasswordRequest request) {
		User user = userRepository.findByEmailAndRec_code(request.getEmail(), request.getCode());
		return null;
	} */
	
}
