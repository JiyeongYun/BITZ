package com.osds.bitz.repository.img;

import com.osds.bitz.model.entity.account.user.UserAuth;
import com.osds.bitz.model.entity.img.UserProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProfileImageRepository extends JpaRepository<UserProfileImage,Long> {
    UserProfileImage  getUserProfileImageByUserAuth(UserAuth userAuth);
}
