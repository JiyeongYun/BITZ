package com.osds.bitz.repository.account.business;

import com.osds.bitz.model.entity.account.business.BusinessAuth;
import com.osds.bitz.model.entity.account.user.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessAuthRepository extends JpaRepository<BusinessAuth, String> {
    BusinessAuth getBusinessAuthByEmail(String email);
}
