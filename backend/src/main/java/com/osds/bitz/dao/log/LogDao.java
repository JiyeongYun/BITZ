package com.osds.bitz.dao.log;

import com.osds.bitz.model.log.LoginLog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LogDao extends JpaRepository<LoginLog, String> {
}
