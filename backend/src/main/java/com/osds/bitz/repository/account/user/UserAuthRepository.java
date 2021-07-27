package com.osds.bitz.repository.account.user;

import com.osds.bitz.model.account.user.UserAuth;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAuthRepository extends JpaRepository<UserAuth, Integer> {

}
