package com.osds.bitz.repository.account.user;

import com.osds.bitz.model.entity.account.user.Manner;
import com.osds.bitz.model.entity.account.user.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

public interface MannerRepository extends JpaRepository<Manner, Long> {
    ArrayList<Manner> getMannersByUserAuth(UserAuth userAuth);

    @Transactional
    void deleteByUserAuth(UserAuth userAuth);
}
