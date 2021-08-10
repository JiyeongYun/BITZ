package com.osds.bitz.repository.account.user;

import com.osds.bitz.model.entity.account.user.Manner;
import com.osds.bitz.model.entity.account.user.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface MannerRepository extends JpaRepository<Manner, Long> {
    Manner getMannerByUserAuth(UserAuth userAuth);

    @Transactional
    void deleteByUserAuth(UserAuth userAuth);
}
