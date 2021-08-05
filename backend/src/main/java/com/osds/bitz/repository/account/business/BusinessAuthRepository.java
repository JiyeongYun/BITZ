package com.osds.bitz.repository.account.business;

import com.osds.bitz.model.entity.account.business.BusinessAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessAuthRepository extends JpaRepository<BusinessAuth, String> {
    BusinessAuth getBusinessAuthByEmail(String email);
    BusinessAuth findBusinessAuthByEmailAndPassword(String email, String password);
    BusinessAuth getBusinessAuthById(String id);
}
