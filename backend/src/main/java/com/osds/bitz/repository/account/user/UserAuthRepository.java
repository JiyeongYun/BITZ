package com.osds.bitz.repository.account.user;

import com.osds.bitz.model.entity.account.user.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAuthRepository extends JpaRepository<UserAuth, String> {
    UserAuth getUserAuthByEmail(String email);
    UserAuth findUserAuthByEmailAndPassword(String email, String password);
}
