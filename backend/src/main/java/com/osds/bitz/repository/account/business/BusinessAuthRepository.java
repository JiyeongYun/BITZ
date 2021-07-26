package com.osds.bitz.repository.account.business;

import com.osds.bitz.model.account.business.BusinessAuth;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessAuthRepository extends JpaRepository<BusinessAuth, String> {
}
