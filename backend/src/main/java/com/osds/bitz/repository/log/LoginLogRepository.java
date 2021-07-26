package com.osds.bitz.repository.log;

import com.osds.bitz.model.log.LoginLog;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginLogRepository extends JpaRepository<LoginLog, String> {
}
