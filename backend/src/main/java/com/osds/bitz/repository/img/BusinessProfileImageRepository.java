package com.osds.bitz.repository.img;

import com.osds.bitz.model.entity.account.business.BusinessAuth;
import com.osds.bitz.model.entity.img.BusinessProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessProfileImageRepository  extends JpaRepository<BusinessProfileImage,Long> {
        BusinessProfileImage getBusinessProfileImageByBusinessAuth(BusinessAuth businessAuth);
}
