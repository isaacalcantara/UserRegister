package com.api.UserRegister.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.api.UserRegister.entities.User;
import com.api.UserRegister.repositories.UserRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class SmsService {
	@Value("${twilio.sid}")
	private String twilioSid;
	
	@Value("${twilio.key}")
	private String twilioKey;
	
	@Value("${twilio.phone.from}")
	private String twilioPhoneFrom;


	@Autowired
	private UserRepository repository;
	
	public void notifyRecuperationCode(String email, String code) {
		Twilio.init(twilioSid, twilioKey);
		
		User user = repository.findByEmail(email);
		
		PhoneNumber to = new PhoneNumber(user.getPhone());
		PhoneNumber from = new PhoneNumber(twilioPhoneFrom);
		
		Message message = Message.creator(to, from, "From Isaac: seu código de recuperação é" + code).create();
		
		message.getSid();
		
		System.out.println(message);
	}
}
