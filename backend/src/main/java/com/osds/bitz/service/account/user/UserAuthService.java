package com.osds.bitz.service.account.user;

import com.osds.bitz.model.entity.account.user.UserAuth;
import com.osds.bitz.model.network.request.ReadUserAuthRequest;
import com.osds.bitz.model.network.request.UpdatePasswordRequest;
import com.osds.bitz.model.network.request.UserAuthRequest;
import com.osds.bitz.repository.account.user.UserAuthRepository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserAuthService {

    @Autowired
    private UserAuthRepository userAuthRepository;

    public UserAuth createUser(UserAuthRequest userAuthRequest) {
        UserAuth userAuth = UserAuth.builder()
                .email(userAuthRequest.getEmail())
                .birth(userAuthRequest.getBirth())
                .password(userAuthRequest.getPassword())
                .build();
        return this.userAuthRepository.save(userAuth);
    }

    public UserAuth updatePassword(UpdatePasswordRequest updatePasswordRequest) {
        // 이메일로 해당 객체 찾아오기
        UserAuth newUserAuth = new UserAuth();
        newUserAuth = this.userAuthRepository.getUserAuthByEmail(updatePasswordRequest.getEmail());

        // 변경할 비밀번호 설정하기
        newUserAuth.setPassword(updatePasswordRequest.getNewPassword());
        return this.userAuthRepository.save(newUserAuth);
    }

    public UserAuth readUser(ReadUserAuthRequest readUserAuthRequest){
        // 이메일과 비밀번호로 객체 찾아오기
        return this.userAuthRepository.findUserAuthByEmailAndPassword(readUserAuthRequest.getEmail(), readUserAuthRequest.getPassword());
    }

}
