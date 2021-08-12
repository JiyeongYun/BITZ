package com.osds.bitz.repository.account;

import com.osds.bitz.model.entity.token.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {
    RefreshToken findRefreshTokenByUserEmail(String email);
}
