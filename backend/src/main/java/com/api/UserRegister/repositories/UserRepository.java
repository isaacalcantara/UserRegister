package com.api.UserRegister.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.api.UserRegister.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	Optional<User> findByEmailAndPassword(String email, String password);
	
	Optional<User> findById(Integer id);
	
	User findByEmail(String email);
	
	@Modifying
	@Query("UPDATE User\r\n"
			+ "	SET rec_code= :code\r\n"
			+ "	WHERE id = :id")
	void updateRecCode(Integer id, String code); 
	
}
