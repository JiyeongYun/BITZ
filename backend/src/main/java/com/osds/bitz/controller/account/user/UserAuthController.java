package com.osds.bitz.controller.account.user;

import com.osds.bitz.model.account.user.UserAuth;
import com.osds.bitz.model.response.UserAuthResponse;
import com.osds.bitz.service.account.user.UserAuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@AllArgsConstructor
@RestController
@RequestMapping("/")
public class UserAuthController {
    private UserAuthService userAuthService;

    @PostMapping
    public ResponseEntity<UserAuthResponse> create(){
        System.out.println("Create");
        return null;
    }

}
