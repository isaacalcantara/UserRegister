package com.api.UserRegister.services;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.UserRegister.entities.User;
import com.api.UserRegister.payloads.requests.ChangePasswordRequest;
import com.api.UserRegister.payloads.responses.ResponseLoginRequest;
import com.api.UserRegister.repositories.UserRepository;

@Service
public class UserServices {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EmailService emailService;

	/*
	 * private BCryptPasswordEncoder passwordEncoder() { return new
	 * BCryptPasswordEncoder(); }
	 */

	public User registerUser(User newUser) {

		User existsUser = userRepository.findByEmail(newUser.getEmail());

		if (existsUser != null) {
			throw new Error("User already exists!");
		}

		// newUser.setPassword(passwordEncoder().encode(newUser.getPassword()));
		return userRepository.save(newUser);

	}

	public List<User> findAllUsers() {
		return userRepository.findAll();
	}

	public Optional<User> findById(Integer id) {
		return userRepository.findById(id);
	}

	public Boolean findByEmailAndGenerateRecuperationCode(String email) throws MessagingException {
		User user = userRepository.findByEmail(email);
		if (user != null) {

			Random random = new Random();

			String n1 = Integer.toString(random.nextInt(10));
			String n2 = Integer.toString(random.nextInt(10));
			String n3 = Integer.toString(random.nextInt(10));
			String n4 = Integer.toString(random.nextInt(10));
			String n5 = Integer.toString(random.nextInt(10));
			String n6 = Integer.toString(random.nextInt(10));

			String recuperationCode = n1 + n2 + n3 + n4 + n5 + n6;

			user.setRec_code(recuperationCode);

			userRepository.save(user);

			emailService.enviarEmail(email, recuperationCode);

			return true;
		} else {
			return false;
		}
	}

	public ResponseLoginRequest authUser(String email, String password) {
		// password = passwordEncoder().encode(password);

		User user = userRepository.findByEmailAndPassword(email, password).orElse(null);

		ResponseLoginRequest response = new ResponseLoginRequest();

		if (user != null) {
			response.setExists(true);
			response.setEmail(user.getEmail());
			response.setId(user.getId());

			Random random = new Random();
			String token = Integer.toString(random.nextInt(10)) + Integer.toString(random.nextInt(10))
					+ Integer.toString(random.nextInt(10)) + Integer.toString(random.nextInt(10))
					+ Integer.toString(random.nextInt(10)) + Integer.toString(random.nextInt(10))
					+ Integer.toString(random.nextInt(10)) + Integer.toString(random.nextInt(10))
					+ Integer.toString(random.nextInt(10)) + Integer.toString(random.nextInt(10))
					+ Integer.toString(random.nextInt(10)) + Integer.toString(random.nextInt(10))
					+ Integer.toString(random.nextInt(10)) + Integer.toString(random.nextInt(10))
					+ Integer.toString(random.nextInt(10)) + Integer.toString(random.nextInt(10));

			user.setToken(token);

			userRepository.save(user);

			response.setToken(token);

			return response;

		} else {
			response.setExists(false);
			return response;
		}
	}

	public String verifyToken(String email) {
		User user = userRepository.findByEmail(email);
		return (user.getToken());
	}

	public String changePassword(ChangePasswordRequest request) {

		User user = userRepository.findByEmail(request.getEmail());

		String result = null;

		String rec_code = user.getRec_code();
		String req_code = request.getCode();

	/*	if (rec_code != req_code) {

			result = "InvalidCode " + rec_code + req_code;
		}*/

		if (rec_code.equals(req_code)) {
			user.setPassword(request.getNewPassword());
			userRepository.save(user);
			result = "alterado";
		}else {
			result = "InvalidCode";
		}

		return result;

	}
	
}
