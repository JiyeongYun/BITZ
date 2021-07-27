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

    @PostMapping("/createuser")
    @ApiOperation(value = "가입하기", notes = "회원의 정보를 DB에 저장합니다.")
    public ResponseEntity<UserAuthResponse> createUser(@RequestBody @ApiParam(value = "회원 정보") UserAuthRequest userAuthRequest) throws Exception{
        log.info("{}:userAuthRequest");
        UserAuthResponse response = new UserAuthResponse(userAuthService.createUser(userAuthRequest));
        return new ResponseEntity<UserAuthResponse>(response, HttpStatus.OK);
    }

    @PostMapping("/updatepassword")
    @ApiOperation(value="비밀번호 변경하기", notes="회원의 비밀번호를 DB에서 수정합니다.")
    public ResponseEntity<UserAuthResponse> updatePassword(@RequestBody @ApiParam(value="회원 정보") UserAuthRequest userAuthRequest) throws Exception{
        log.info("{}",userAuthRequest);
        UserAuthResponse response = new UserAuthResponse(userAuthService.updatePassword(userAuthRequest));
        return new ResponseEntity<UserAuthResponse>(response, HttpStatus.OK);
    }
//    @PutMapping("/findpassword")
//    @ApiOperation(value="비밀번호 찾기", notes="회원의 이메일에 비밀번호를 찾아서 임시 비밀번호를 이메일로 전송합니다.")
//    public ResponseEntity<UserAuthResponse> findpassword(@RequestBody @ApiParam(value=" 비밀번호 찾기") UserAuthRequest userAuthRequest)throws Exception{
//        // 이메일에 해당하는 정보 있는지 확인하기
//        // 해당 이메일로 임시 비밀번호 발급하기
//        // 임시 비밀번호로 비밀번호 변경하기
//    }

}
