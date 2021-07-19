package com.web.curation.dao.user;

import java.util.Optional;

import javax.validation.Valid;

import com.web.curation.model.user.SignupRequest;
import com.web.curation.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, String> {

	User getUserByEmail(String email);

	User getUserByNickname(String nickname);

	Optional<User> findUserByEmailAndPassword(String email, String password);
}
