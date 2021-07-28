package com.osds.bitz.service.account.business;

import com.osds.bitz.model.entity.account.business.BusinessAuth;
import com.osds.bitz.model.network.request.UpdatePasswordRequest;
import com.osds.bitz.repository.account.business.BusinessAuthRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class BusinessAuthService {

    @Autowired
    private BusinessAuthRepository businessAuthRepository;

    // 비밀번호 변경하기
    public BusinessAuth updatePassword(UpdatePasswordRequest updatePasswordRequest) {
        // 이메일로 해당 객체 찾아오기
        BusinessAuth newBusinessAuth = new BusinessAuth();
        newBusinessAuth = this.businessAuthRepository.getBusinessAuthByEmail(updatePasswordRequest.getEmail());

        // 변경할 비밀번호 설정하기
        newBusinessAuth.setPassword(updatePasswordRequest.getNewPassword());
        return this.businessAuthRepository.save(newBusinessAuth);
    }
}
