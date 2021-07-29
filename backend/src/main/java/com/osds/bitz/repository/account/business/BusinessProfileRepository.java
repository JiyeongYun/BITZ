package com.osds.bitz.repository.account.business;

import com.osds.bitz.model.entity.account.business.BusinessProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessProfileRepository extends JpaRepository<BusinessProfile, Long> {
}
