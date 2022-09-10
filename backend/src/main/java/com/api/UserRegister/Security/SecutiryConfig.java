package com.api.UserRegister.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class SecutiryConfig {
	
	 @Bean
	    public WebSecurityCustomizer webSecurityCustomizer() {
	        return (web) -> web.ignoring().antMatchers("/api/user/save").anyRequest();
	    }
	 
	 
	
}
