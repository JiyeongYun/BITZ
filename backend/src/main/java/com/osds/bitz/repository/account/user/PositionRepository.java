package com.osds.bitz.repository.account.user;


import com.osds.bitz.model.entity.account.user.Position;
import com.osds.bitz.model.entity.account.user.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PositionRepository extends JpaRepository<Position, Long> {
    Position getPositionByUserAuth(UserAuth userAuth);
}
