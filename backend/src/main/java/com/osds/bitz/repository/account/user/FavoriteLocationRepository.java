package com.osds.bitz.repository.account.user;

import com.osds.bitz.model.entity.account.user.FavoriteLocation;
import com.osds.bitz.model.entity.account.user.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface FavoriteLocationRepository extends JpaRepository<FavoriteLocation, Long> {
    FavoriteLocation getFavoriteLocationById(Long id);
    FavoriteLocation getFavoriteLocationByUserAuth(UserAuth userAuth);

    @Transactional
    void deleteByUserAuth(UserAuth userAuth);
}
