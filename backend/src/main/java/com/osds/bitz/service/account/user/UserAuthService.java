package com.osds.bitz.service.account.user;

import com.osds.bitz.model.account.user.UserAuth;
import com.osds.bitz.model.request.UserAuthRequest;
import com.osds.bitz.repository.account.user.UserAuthRepository;

import org.springframework.stereotype.Service;

@Service
public class UserAuthService {

    private UserAuthRepository userAuthRepo;

     public UserAuth add(UserAuthRequest userAuthRequest){
       UserAuth userAuth = new UserAuth();
       userAuth.setEmail(userAuthRequest.getEmail());
       userAuth.setPassword(userAuthRequest.getPassword());
       userAuth.setBirth(userAuthRequest.getBirth());
       return this.userAuthRepo.save(userAuth);
   }
}
