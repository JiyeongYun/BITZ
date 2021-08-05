package com.osds.bitz.jwt;


import com.osds.bitz.model.entity.account.user.UserAuth;
import com.osds.bitz.repository.account.RefreshTokenRepository;
import com.osds.bitz.repository.account.user.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserAuthRepository userAuthRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserAuth user = userAuthRepository.getUserAuthByEmail(email);
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), new ArrayList<>());
    }

    public UserAuth getUserAuthByUserEmail(String email){
        return userAuthRepository.getUserAuthByEmail(email);
    }

    public String getRefreshTokenByEmail(String email) {
        return refreshTokenRepository.findRefreshTokenByUserEmail(email).getValue();
    }
}
