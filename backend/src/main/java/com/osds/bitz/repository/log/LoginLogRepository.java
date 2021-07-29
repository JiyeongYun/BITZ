package com.osds.bitz.repository.log;

import com.osds.bitz.model.entity.log.LoginLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginLogRepository extends JpaRepository<LoginLog, Long> {
    LoginLog getLoginLogByUserEmailAndIsGeneral(String email, boolean isGeneral);
}
