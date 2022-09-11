package com.api.UserRegister.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;

@Configuration
public class SecutiryConfig {
	
	@Bean
	    public WebSecurityCustomizer webSecurityCustomizer() {
	        return (web) -> web.ignoring().antMatchers("POST", "http://localhost:5173").antMatchers("/api/user/save").anyRequest();
	 	}
	 
	 
	
}
