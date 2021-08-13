package com.osds.bitz.repository.img;

import com.osds.bitz.model.entity.account.business.BusinessAuth;
import com.osds.bitz.model.entity.img.BusinessRegistrationImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessRegistrationImageRepository  extends JpaRepository<BusinessRegistrationImage,Long> {
    BusinessRegistrationImage getBusinessRegistrationImageByBusinessAuth(BusinessAuth businessAuth);
}
