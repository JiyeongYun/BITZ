package com.osds.bitz.dao.account.business;

import com.osds.bitz.model.account.business.BusinessAuth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessDao extends JpaRepository<BusinessAuth, String> {
}
