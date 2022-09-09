package com.api.UserRegister.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TB_User")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private String email;
    private String password;
    private String tipo;
    private Boolean status;

    public User(){

    }

    public User(String name, String email, String password,String tipo, Boolean status) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.tipo = tipo;
        this.status = status;
    }

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	@Override
	public int hashCode() {
		return Objects.hash(email, id, name, password, status, tipo);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return Objects.equals(email, other.email) && Objects.equals(id, other.id) && Objects.equals(name, other.name)
				&& Objects.equals(password, other.password) && Objects.equals(status, other.status)
				&& Objects.equals(tipo, other.tipo);
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", tipo=" + tipo + ", status=" + status + "]";
	}
    
    

}
