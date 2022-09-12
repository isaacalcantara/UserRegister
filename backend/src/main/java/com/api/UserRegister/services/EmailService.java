package com.api.UserRegister.services;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.api.UserRegister.entities.Email;

@Service
public class EmailService {
	
	@Value("${spring.mail.username}")
	private String username_from;
	
	@Value("${spring.mail.password}")
	private String password;

	
	@Autowired
	private JavaMailSender javaMailSender;
	
	public void enviarEmail(String email, String code) throws MessagingException {
		
		
		
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(message, true);
		
		mimeMessageHelper.setFrom(username_from);
		mimeMessageHelper.setTo(email);
		mimeMessageHelper.setSubject("Your recuperation code");
		mimeMessageHelper.setText("Your code is: " + code);
		
		javaMailSender.send(message);
		
		System.out.println(message);
		
	}
}
