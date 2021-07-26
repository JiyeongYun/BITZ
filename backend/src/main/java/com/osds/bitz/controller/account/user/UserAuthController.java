package com.osds.bitz.controller.account.user;

import com.osds.bitz.model.request.UserAuthRequest;
import com.osds.bitz.model.response.UserAuthResponse;
import com.osds.bitz.service.account.user.UserAuthService;

import io.swagger.annotations.Api;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/account")
@Api("Account 컨트롤러 API V1")
@Slf4j
public class UserAuthController {

    private UserAuthService userAuthService;

    @PostMapping("/signup")
    @ApiOperation(value = "가입하기", notes = "회원의 정보를 DB에 저장합니다.")
    public ResponseEntity<UserAuthResponse> write(@RequestBody @ApiParam(value = "회원 정보") UserAuthRequest userAuthRequest) {

        log.info("{}", userAuthRequest);
        UserAuthResponse response = new UserAuthResponse(userAuthService.write(userAuthRequest));
        return new ResponseEntity<UserAuthResponse>(response, HttpStatus.OK);
    }

}
