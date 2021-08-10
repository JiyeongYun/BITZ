package com.osds.bitz.repository.log;

import com.osds.bitz.model.entity.log.LoginLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface LoginLogRepository extends JpaRepository<LoginLog, Long> {
    LoginLog getLoginLogByEmailAndIsGeneral(String email, boolean isGeneral);

    @Transactional
    void deleteAllByEmail(String email);
}
