package com.osds.bitz.service.account.user;

import com.osds.bitz.model.account.user.UserAuth;
import com.osds.bitz.model.request.UserAuthRequest;

import com.osds.bitz.repository.account.user.UserAuthRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserAuthService {

    private UserAuthRepository userAuthRepository;

    public UserAuth write(UserAuthRequest userAuthRequest) {
        log.info("{}", userAuthRequest);
        UserAuth userAuth = UserAuth.builder()
                .email(userAuthRequest.getEmail())
                .birth(userAuthRequest.getBirth())
                .password(userAuthRequest.getPassword())
                .build();
        log.info("{}", userAuth);
        return this.userAuthRepository.save(userAuth);
    }
}
