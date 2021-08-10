package com.osds.bitz.repository.account.user;


import com.osds.bitz.model.entity.account.user.Position;
import com.osds.bitz.model.entity.account.user.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface PositionRepository extends JpaRepository<Position, Long> {
    Position getPositionById(Long id);
    Position getPositionByUserAuth(UserAuth userAuth);

    @Transactional
    void deleteByUserAuth(UserAuth userAuth);
}
