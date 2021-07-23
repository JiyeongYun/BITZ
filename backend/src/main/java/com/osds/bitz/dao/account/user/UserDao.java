package com.osds.bitz.dao.account.user;

import com.osds.bitz.model.account.user.UserAuth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<UserAuth, String> {

}
