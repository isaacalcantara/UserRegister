package com.api.UserRegister.payloads.responses;

public class ResponseLoginRequest {
	private Integer id;
	private String email;
	private String token;
	private Boolean exists;
	
	
	public ResponseLoginRequest() {
		
	}
	
	

	public ResponseLoginRequest(Integer id, String email, String token, Boolean exists) {
		super();
		this.id = id;
		this.email = email;
		this.token = token;
		this.exists = exists;
	}



	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}



	public Boolean getExists() {
		return exists;
	}
	

	public void setExists(Boolean exists) {
		this.exists = exists;
	}
	
	
	

}
