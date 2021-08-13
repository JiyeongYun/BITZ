package com.osds.bitz.repository.img;

import com.osds.bitz.model.entity.account.user.UserAuth;
import com.osds.bitz.model.entity.img.UserProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface UserProfileImageRepository extends JpaRepository<UserProfileImage,Long> {
    UserProfileImage  getUserProfileImageByUserAuth(UserAuth userAuth);

    @Transactional
    void deleteAllByUserAuth(UserAuth userAuth);
}
