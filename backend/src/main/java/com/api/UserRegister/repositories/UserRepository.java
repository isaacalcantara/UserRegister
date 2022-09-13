package com.api.UserRegister.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.UserRegister.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	Optional<User> findByEmailAndPassword(String email, String password);
	
	Optional<User> findById(Integer id);
	
	User findByEmail(String email);
	
	/*@Modifying
	@Query("UPDATE User\r\n"
			+ "	SET token= :token\r\n"
			+ "	WHERE id = :id")
	void updateUserToken(String email, String token);
	
	@Modifying
	@Query("UPDATE User\r\n"
			+ "	SET rec_code= :code\r\n"
			+ "	WHERE email = :email")
	void updateRecCode(String email, String code); 

	@Modifying
	@Query("UPDATE User\r\n"
			+ "	SET rec_code=null, password= :newPassword\r\n"
			+ "	WHERE id = :id")
	void updateUser(Integer id, String newPassword);
	*/
	
}
